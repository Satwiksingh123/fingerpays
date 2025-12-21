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

    // Get user's wallet first
    const { data: wallet, error: walletError } = await supabase
      .from('wallets')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (walletError || !wallet) {
      throw new Error('Wallet not found')
    }

    // Create demo transactions
    const demoTransactions = [
      {
        user_id: user.id,
        wallet_id: wallet.id,
        type: 'recharge',
        amount: 1000,
        status: 'completed',
        merchant_name: 'Fingerpays Wallet',
        description: 'Initial wallet setup bonus',
        payment_method: 'demo',
        reference_id: 'DEMO_RECHARGE_001'
      },
      {
        user_id: user.id,
        wallet_id: wallet.id,
        type: 'payment',
        amount: 45,
        status: 'completed',
        merchant_name: 'Campus Cafeteria',
        description: 'Lunch payment',
        reference_id: 'DEMO_PAYMENT_001'
      },
      {
        user_id: user.id,
        wallet_id: wallet.id,
        type: 'payment',
        amount: 25,
        status: 'completed',
        merchant_name: 'Library',
        description: 'Book fine payment',
        reference_id: 'DEMO_PAYMENT_002'
      },
      {
        user_id: user.id,
        wallet_id: wallet.id,
        type: 'recharge',
        amount: 500,
        status: 'completed',
        merchant_name: 'Fingerpays Wallet',
        description: 'Wallet recharge via UPI',
        payment_method: 'upi',
        reference_id: 'DEMO_RECHARGE_002'
      },
      {
        user_id: user.id,
        wallet_id: wallet.id,
        type: 'payment',
        amount: 150,
        status: 'completed',
        merchant_name: 'Bookstore',
        description: 'Textbook purchase',
        reference_id: 'DEMO_PAYMENT_003'
      }
    ]

    // Insert demo transactions
    const { data: transactions, error: transactionError } = await supabase
      .from('transactions')
      .insert(demoTransactions)
      .select()

    if (transactionError) {
      console.error('Demo transaction error:', transactionError)
      return new Response(
        JSON.stringify({ error: 'Failed to create demo transactions' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`Created ${transactions.length} demo transactions for user ${user.id}`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Created ${transactions.length} demo transactions`,
        transactions: transactions.length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Demo function error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})