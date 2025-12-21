import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    )

    // Get user from authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (userError || !user) {
      throw new Error('Invalid user token')
    }

    const { method } = req
    const url = new URL(req.url)
    const pathParts = url.pathname.split('/').filter(Boolean)
    const operation = pathParts[pathParts.length - 1] || 'wallet'

    console.log(`Processing ${method} request for operation: ${operation}`)

    if ((method === 'GET' || method === 'POST') && operation === 'wallet') {
      // Get wallet data, create if doesn't exist
      let { data: wallet, error: walletError } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle()

      if (walletError) {
        console.error('Wallet fetch error:', walletError)
        return new Response(
          JSON.stringify({ error: 'Failed to fetch wallet data' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Auto-create wallet if doesn't exist
      if (!wallet) {
        console.log(`Creating wallet for user ${user.id}`)
        const { data: newWallet, error: createError } = await supabase
          .from('wallets')
          .insert({ user_id: user.id })
          .select()
          .single()

        if (createError) {
          console.error('Wallet creation error:', createError)
          return new Response(
            JSON.stringify({ error: 'Failed to create wallet' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }
        wallet = newWallet
      }

      return new Response(
        JSON.stringify({ wallet }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if ((method === 'GET' || method === 'POST') && operation === 'transactions') {
      const page = parseInt(url.searchParams.get('page') || '1')
      const limit = parseInt(url.searchParams.get('limit') || '20')
      const type = url.searchParams.get('type')
      const offset = (page - 1) * limit

      let query = supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (type && type !== 'all') {
        query = query.eq('type', type)
      }

      const { data: transactions, error: transactionsError } = await query

      if (transactionsError) {
        console.error('Transactions fetch error:', transactionsError)
        return new Response(
          JSON.stringify({ error: 'Failed to fetch transactions' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      return new Response(
        JSON.stringify({ transactions }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (method === 'POST' && operation === 'recharge') {
      const { amount, payment_method } = await req.json()

      if (!amount || amount < 50 || amount > 10000) {
        return new Response(
          JSON.stringify({ error: 'Invalid amount. Must be between ₹50 and ₹10,000' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Check max balance limit
      const { data: currentWallet, error: balanceCheckError } = await supabase
        .from('wallets')
        .select('balance, max_balance')
        .eq('user_id', user.id)
        .single()

      if (balanceCheckError || !currentWallet) {
        console.error('Balance check error:', balanceCheckError)
        return new Response(
          JSON.stringify({ error: 'Unable to verify wallet balance' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      if (currentWallet.balance + amount > currentWallet.max_balance) {
        return new Response(
          JSON.stringify({ 
            error: `Recharge would exceed maximum balance limit of ₹${currentWallet.max_balance}`,
            current_balance: currentWallet.balance,
            max_balance: currentWallet.max_balance 
          }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Generate order reference
      const orderReference = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      // Create recharge order
      const { data: order, error: orderError } = await supabase
        .from('recharge_orders')
        .insert({
          user_id: user.id,
          amount: amount,
          payment_method: payment_method,
          order_reference: orderReference,
          status: 'pending'
        })
        .select()
        .single()

      if (orderError) {
        console.error('Order creation error:', orderError)
        return new Response(
          JSON.stringify({ error: 'Failed to create recharge order' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // For demo purposes, simulate successful payment after 2 seconds
      setTimeout(async () => {
        try {
          // Get wallet
          const { data: wallet } = await supabase
            .from('wallets')
            .select('id')
            .eq('user_id', user.id)
            .single()

          if (wallet) {
            // Create successful transaction
            await supabase
              .from('transactions')
              .insert({
                user_id: user.id,
                wallet_id: wallet.id,
                type: 'recharge',
                amount: amount,
                status: 'completed',
                merchant_name: 'Fingerpays Wallet',
                description: `Wallet recharge via ${payment_method}`,
                payment_method: payment_method,
                reference_id: orderReference
              })

            // Update order status
            await supabase
              .from('recharge_orders')
              .update({ status: 'completed' })
              .eq('id', order.id)
          }
        } catch (error) {
          console.error('Background processing error:', error)
        }
      }, 2000)

      return new Response(
        JSON.stringify({ 
          success: true, 
          order_reference: orderReference,
          message: 'Recharge initiated successfully. Amount will be credited shortly.' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (method === 'POST' && operation === 'payment') {
      const { amount, merchant_name, description } = await req.json()

      if (!amount || amount <= 0) {
        return new Response(
          JSON.stringify({ error: 'Invalid amount' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Check wallet balance and daily limit
      const { data: wallet, error: walletError } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (walletError || !wallet) {
        console.error('Wallet fetch error:', walletError)
        return new Response(
          JSON.stringify({ error: 'Wallet not found' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      if (wallet.balance < amount) {
        return new Response(
          JSON.stringify({ 
            error: 'Insufficient balance',
            current_balance: wallet.balance,
            required_amount: amount 
          }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Check daily spending limit
      const today = new Date().toISOString().split('T')[0]
      const { data: todayPayments, error: dailyCheckError } = await supabase
        .from('transactions')
        .select('amount')
        .eq('user_id', user.id)
        .eq('type', 'payment')
        .eq('status', 'completed')
        .gte('created_at', `${today}T00:00:00.000Z`)
        .lte('created_at', `${today}T23:59:59.999Z`)

      if (dailyCheckError) {
        console.error('Daily limit check error:', dailyCheckError)
        return new Response(
          JSON.stringify({ error: 'Unable to verify daily spending limit' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      const todaySpent = todayPayments?.reduce((sum, t) => sum + Number(t.amount), 0) || 0
      
      if (todaySpent + amount > wallet.daily_limit) {
        return new Response(
          JSON.stringify({ 
            error: `Payment would exceed daily spending limit of ₹${wallet.daily_limit}`,
            today_spent: todaySpent,
            daily_limit: wallet.daily_limit,
            remaining_limit: wallet.daily_limit - todaySpent
          }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Create payment transaction
      const { data: transaction, error: transactionError } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          wallet_id: wallet.id,
          type: 'payment',
          amount: amount,
          status: 'completed',
          merchant_name: merchant_name || 'Unknown Merchant',
          description: description || 'Payment transaction',
          reference_id: `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        })
        .select()
        .single()

      if (transactionError) {
        console.error('Payment transaction error:', transactionError)
        return new Response(
          JSON.stringify({ error: 'Payment failed' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          transaction_id: transaction.id,
          message: 'Payment successful' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Operation not found' }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})