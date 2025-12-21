import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface Wallet {
  id: string;
  user_id: string;
  balance: number;
  total_recharged: number;
  total_spent: number;
  monthly_spent: number;
  daily_limit: number;
  max_balance: number;
  created_at: string;
  updated_at: string;
}

interface Transaction {
  id: string;
  user_id: string;
  wallet_id: string;
  type: 'recharge' | 'payment' | 'refund' | 'transfer_in' | 'transfer_out';
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  merchant_name?: string;
  description?: string;
  payment_method?: string;
  reference_id?: string;
  metadata?: any;
  created_at: string;
  updated_at: string;
}

export const useWallet = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [recharging, setRecharging] = useState(false);

  const fetchWallet = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase.functions.invoke('wallet-operations/wallet', {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (error) {
        console.error('Wallet API error:', error);
        throw new Error(error.message || 'Failed to fetch wallet data');
      }
      
      if (data?.error) {
        throw new Error(data.error);
      }
      
      setWallet(data.wallet);
    } catch (error: any) {
      console.error('Error fetching wallet:', error);
      toast({
        title: "Wallet Error",
        description: error.message || "Failed to fetch wallet data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const fetchTransactions = async (type?: string, page: number = 1, limit: number = 20) => {
    if (!user) return;
    
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      
      if (type && type !== 'all') {
        params.append('type', type);
      }

      const { data, error } = await supabase.functions.invoke(`wallet-operations/transactions?${params}`, {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (error) {
        console.error('Transactions API error:', error);
        throw new Error(error.message || 'Failed to fetch transactions');
      }
      
      if (data?.error) {
        throw new Error(data.error);
      }
      
      if (page === 1) {
        setTransactions(data.transactions || []);
      } else {
        setTransactions(prev => [...prev, ...(data.transactions || [])]);
      }
    } catch (error: any) {
      console.error('Error fetching transactions:', error);
      toast({
        title: "Transactions Error",
        description: error.message || "Failed to fetch transactions. Please try again.",
        variant: "destructive",
      });
    }
  };

  const rechargeWallet = async (amount: number, paymentMethod: string) => {
    if (!user) return false;
    
    setRecharging(true);
    try {
      const { data, error } = await supabase.functions.invoke('wallet-operations/recharge', {
        body: {
          amount,
          payment_method: paymentMethod,
        },
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (error) throw error;

      toast({
        title: "Recharge Initiated",
        description: data.message,
      });

      // Refresh wallet data after a short delay
      setTimeout(() => {
        fetchWallet();
        fetchTransactions();
      }, 3000);

      return true;
    } catch (error: any) {
      console.error('Error recharging wallet:', error);
      toast({
        title: "Recharge Failed",
        description: error.message || error.details || "Failed to process recharge. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setRecharging(false);
    }
  };

  const makePayment = async (amount: number, merchantName: string, description?: string) => {
    if (!user) return false;
    
    try {
      const { data, error } = await supabase.functions.invoke('wallet-operations/payment', {
        body: {
          amount,
          merchant_name: merchantName,
          description,
        },
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (error) throw error;

      toast({
        title: "Payment Successful",
        description: data.message,
      });

      // Refresh data
      fetchWallet();
      fetchTransactions();

      return true;
    } catch (error: any) {
      console.error('Error making payment:', error);
      toast({
        title: "Payment Failed",
        description: error.message || "Payment could not be processed",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    if (user) {
      const loadData = async () => {
        setLoading(true);
        await Promise.all([fetchWallet(), fetchTransactions()]);
        setLoading(false);
      };
      loadData();
    }
  }, [user]);

  return {
    wallet,
    transactions,
    loading,
    recharging,
    fetchWallet,
    fetchTransactions,
    rechargeWallet,
    makePayment,
  };
};