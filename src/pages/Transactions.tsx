import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpCircle, ArrowDownCircle, RefreshCw, CreditCard, Plus, Zap } from "lucide-react"
import { useState, useEffect } from "react"
import { useWallet } from "@/hooks/useWallet"
import { Skeleton } from "@/components/ui/skeleton"
import { format } from "date-fns"

const Transactions = () => {
  const [selectedTab, setSelectedTab] = useState("all")
  const { wallet, transactions, loading, fetchTransactions } = useWallet()
  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    if (selectedTab !== "all") {
      fetchTransactions(selectedTab)
    } else {
      fetchTransactions()
    }
  }, [selectedTab])

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'recharge':
      case 'refund':
      case 'transfer_in':
        return Plus
      case 'payment':
      case 'transfer_out':
        return CreditCard
      default:
        return CreditCard
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'recharge':
      case 'refund':
      case 'transfer_in':
        return 'text-green-600'
      case 'payment':
      case 'transfer_out':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const formatAmount = (amount: number, type: string) => {
    const prefix = ['recharge', 'refund', 'transfer_in'].includes(type) ? '+' : '-'
    return `${prefix}₹${Math.abs(amount).toFixed(2)}`
  }

  const loadMoreTransactions = async () => {
    setLoadingMore(true)
    await fetchTransactions(selectedTab === "all" ? undefined : selectedTab, Math.ceil(transactions.length / 20) + 1)
    setLoadingMore(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Transaction History
          </h1>
          <p className="text-muted-foreground text-lg">
            Track all your wallet activities
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 max-w-md mx-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="recharge">Recharges</TabsTrigger>
              <TabsTrigger value="payment">Payments</TabsTrigger>
              <TabsTrigger value="refund">Refunds</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <ArrowUpCircle className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Recharged</p>
                  {loading ? (
                    <Skeleton className="h-8 w-20" />
                  ) : (
                    <p className="text-2xl font-bold">₹{wallet?.total_recharged?.toFixed(2) || '0.00'}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <ArrowDownCircle className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                  {loading ? (
                    <Skeleton className="h-8 w-20" />
                  ) : (
                    <p className="text-2xl font-bold">₹{wallet?.total_spent?.toFixed(2) || '0.00'}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Zap className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">This Month</p>
                  {loading ? (
                    <Skeleton className="h-8 w-20" />
                  ) : (
                    <>
                      <p className="text-2xl font-bold">{transactions.length}</p>
                      <p className="text-xs text-muted-foreground">transactions</p>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  </div>
                ))
              ) : transactions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No transactions found</p>
                </div>
              ) : (
                transactions.map((transaction) => {
                  const Icon = getTransactionIcon(transaction.type)
                  return (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${
                          ['recharge', 'refund', 'transfer_in'].includes(transaction.type)
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-blue-100 text-blue-600'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{transaction.merchant_name || 'Unknown Merchant'}</p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(transaction.created_at), 'PPp')}
                          </p>
                          {transaction.description && (
                            <p className="text-xs text-muted-foreground">{transaction.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                            {formatAmount(transaction.amount, transaction.type)}
                          </p>
                          <Badge variant={transaction.status === 'completed' ? 'default' : 'destructive'}>
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
            
            {!loading && transactions.length > 0 && (
              <div className="mt-6 text-center">
                <Button 
                  variant="outline" 
                  onClick={loadMoreTransactions}
                  disabled={loadingMore}
                >
                  {loadingMore ? "Loading..." : "Load More Transactions"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Transactions;