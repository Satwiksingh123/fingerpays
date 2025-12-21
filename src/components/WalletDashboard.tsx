import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff, Plus, Send, History, TrendingUp } from "lucide-react";
import { useState } from "react";

const WalletDashboard = () => {
  const [showBalance, setShowBalance] = useState(true);

  const recentTransactions = [
    { id: 1, merchant: "Campus Cafeteria", amount: -45, time: "2 min ago", type: "payment" },
    { id: 2, merchant: "Library Fine", amount: -15, time: "1 hour ago", type: "payment" },
    { id: 3, merchant: "Wallet Recharge", amount: +500, time: "Yesterday", type: "recharge" },
    { id: 4, merchant: "Bookstore", amount: -120, time: "2 days ago", type: "payment" },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Your Digital Wallet
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience seamless campus payments with real-time balance tracking and instant transactions.
          </p>
        </div>

        {/* Wallet Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-primary text-white p-8 mb-8 border-0 shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-white/80 text-sm mb-2">Available Balance</div>
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-bold">
                    {showBalance ? "₹2,450" : "₹••••"}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowBalance(!showBalance)}
                    className="text-white hover:bg-white/20"
                  >
                    {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </Button>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white/80 text-sm">Student ID</div>
                <div className="font-semibold">CS21B001</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button variant="success" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Money
              </Button>
              <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                <Send className="w-4 h-4 mr-2" />
                Send Money
              </Button>
              <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                <History className="w-4 h-4 mr-2" />
                History
              </Button>
            </div>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">₹850</div>
                  <div className="text-sm text-muted-foreground">This Month</div>
                </div>
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
              </div>
            </Card>
            
            <Card className="p-6 shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">23</div>
                  <div className="text-sm text-muted-foreground">Transactions</div>
                </div>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <History className="w-6 h-6 text-primary" />
                </div>
              </div>
            </Card>
            
            <Card className="p-6 shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">₹75</div>
                  <div className="text-sm text-muted-foreground">Average Spend</div>
                </div>
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <Send className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card className="p-6 shadow-card">
            <h3 className="text-xl font-semibold mb-6">Recent Transactions</h3>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      transaction.type === 'recharge' ? 'bg-accent/20' : 'bg-primary/20'
                    }`}>
                      {transaction.type === 'recharge' ? (
                        <Plus className="w-5 h-5 text-accent" />
                      ) : (
                        <Send className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{transaction.merchant}</div>
                      <div className="text-sm text-muted-foreground">{transaction.time}</div>
                    </div>
                  </div>
                  <div className={`font-semibold ${
                    transaction.amount > 0 ? 'text-accent' : 'text-foreground'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount)}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WalletDashboard;