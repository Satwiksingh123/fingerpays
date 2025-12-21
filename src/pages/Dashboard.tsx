import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Plus, Send, History, BarChart3, Users, Shield, Check, AlertTriangle, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useWallet } from "@/hooks/useWallet";
import { Skeleton } from "@/components/ui/skeleton";
import { DemoDataButton } from "@/components/DemoDataButton";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const [showBalance, setShowBalance] = useState(true);
  const { wallet, transactions, loading, fetchWallet } = useWallet();
  const { toast } = useToast();
  const [retrying, setRetrying] = useState(false);
  
  const handleRetry = async () => {
    setRetrying(true);
    try {
      await fetchWallet();
      toast({
        title: "Data refreshed",
        description: "Your wallet data has been updated.",
      });
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: "Unable to refresh data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setRetrying(false);
    }
  };

  const hasError = !loading && !wallet;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome to Your <span className="text-primary">Fingerpays Dashboard</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your wallet balance and transactions securely
            <DemoDataButton />
          </p>
          {hasError && (
            <Alert className="mt-4 max-w-2xl mx-auto">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>Unable to load wallet data. Please check your connection and try again.</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRetry}
                  disabled={retrying}
                  className="ml-2"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${retrying ? 'animate-spin' : ''}`} />
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Balance Card */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-primary text-white border-0 shadow-lg">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">Current Balance</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowBalance(!showBalance)}
                    className="text-white hover:bg-white/20"
                  >
                    {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-12 w-48 bg-white/20" />
                    <div className="grid grid-cols-2 gap-4">
                      <Skeleton className="h-8 w-full bg-white/20" />
                      <Skeleton className="h-8 w-full bg-white/20" />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-4xl font-bold mb-6">
                      {showBalance ? `₹${wallet?.balance?.toFixed(2) || '0.00'}` : "₹****"}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <div className="text-sm opacity-90">Total Recharged</div>
                        <div className="text-lg font-semibold">₹{wallet?.total_recharged?.toFixed(2) || '0.00'}</div>
                      </div>
                      <div>
                        <div className="text-sm opacity-90">Monthly Spent</div>
                        <div className="text-lg font-semibold">₹{wallet?.monthly_spent?.toFixed(2) || '0.00'}</div>
                      </div>
                    </div>
                  </>
                )}
                
                <div className="flex gap-3">
                  <Link to="/dashboard/recharge" className="flex-1">
                    <Button variant="secondary" className="w-full bg-white text-primary hover:bg-white/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Money
                    </Button>
                  </Link>
                  <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                    <Send className="w-4 h-4 mr-2" />
                    Send Money
                  </Button>
                  <Link to="/dashboard/transactions">
                    <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                      <History className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Usage Stats */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Usage Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Daily Limit</span>
                      <span className="font-semibold">₹{wallet?.daily_limit?.toFixed(2) || '2,000.00'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Max Balance</span>
                      <span className="font-semibold">₹{wallet?.max_balance?.toFixed(2) || '10,000.00'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Available Space</span>
                      <span className="font-semibold text-green-600">
                        ₹{((wallet?.max_balance || 10000) - (wallet?.balance || 0)).toFixed(2)}
                      </span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Security Status */}
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Fingerprint Active</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">2FA Enabled</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Account Verified</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/dashboard/recharge">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Plus className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold">Recharge Wallet</h3>
                  <p className="text-sm text-muted-foreground">Add money instantly</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/dashboard/transactions">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="text-center">
                  <History className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold">Transaction History</h3>
                  <p className="text-sm text-muted-foreground">View all transactions</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="text-center">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">Refer & Earn</h3>
                <p className="text-sm text-muted-foreground">Invite friends, earn rewards</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;