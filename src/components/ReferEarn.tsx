import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Gift, Users, Share, TrendingUp } from "lucide-react";

const ReferEarn = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Refer Friends & Earn Rewards
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Share Fingerpays with your friends and earn exciting rewards. The more you refer, the more you earn!
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main Offer Card */}
          <Card className="bg-gradient-primary text-white p-8 md:p-12 mb-12 text-center shadow-2xl border-0">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <Gift className="w-10 h-10" />
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Earn ₹50 for Every Friend
            </h3>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              When your friend signs up with your referral code and makes their first transaction, 
              both of you get ₹50 added to your wallet instantly!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="success" size="lg" className="font-semibold">
                <Share className="w-5 h-5 mr-2" />
                Share Referral Code
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                View My Earnings
              </Button>
            </div>
          </Card>

          {/* How it Works */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="p-6 text-center shadow-card">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Share className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Share Your Code</h3>
              <p className="text-muted-foreground">
                Share your unique referral code with friends through WhatsApp, social media, or in person.
              </p>
            </Card>

            <Card className="p-6 text-center shadow-card">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Friend Signs Up</h3>
               <p className="text-muted-foreground">
                 Your friend downloads Fingerpays, signs up with your code, and completes verification.
               </p>
            </Card>

            <Card className="p-6 text-center shadow-card">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Both Get Rewarded</h3>
              <p className="text-muted-foreground">
                Once they make their first transaction, both of you receive ₹50 in your wallets instantly.
              </p>
            </Card>
          </div>

          {/* Stats */}
          <Card className="p-8 shadow-card">
            <h3 className="text-2xl font-bold text-center text-foreground mb-8">
              Your Referral Stats
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">0</div>
                <div className="text-sm text-muted-foreground">Total Referrals</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">₹0</div>
                <div className="text-sm text-muted-foreground">Total Earned</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">₹0</div>
                <div className="text-sm text-muted-foreground">This Month</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
            </div>
          </Card>

          {/* Special Offers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
              <h4 className="text-lg font-semibold text-foreground mb-2">🎯 Monthly Challenge</h4>
              <p className="text-muted-foreground mb-4">
                Refer 10 friends this month and get a bonus ₹200!
              </p>
              <div className="text-sm text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full inline-block">
                Progress: 0/10 referrals
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <h4 className="text-lg font-semibold text-foreground mb-2">🏆 VIP Referrer</h4>
              <p className="text-muted-foreground mb-4">
                Complete 50 successful referrals to unlock exclusive rewards and higher commission rates.
              </p>
              <div className="text-sm text-green-700 bg-green-100 px-3 py-1 rounded-full inline-block">
                Elite Status: Locked
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferEarn;