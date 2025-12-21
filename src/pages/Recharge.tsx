import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Zap, DollarSign, CreditCard, Smartphone, Building2, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Recharge = () => {
  const [selectedAmount, setSelectedAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [amountError, setAmountError] = useState("");
  const { rechargeWallet, recharging, wallet } = useWallet();
  const navigate = useNavigate();
  const { toast } = useToast();

  const quickAmounts = ["₹100", "₹250", "₹500", "₹1000"];

  const validateAmount = (amount: number) => {
    if (!amount || isNaN(amount)) {
      setAmountError("Please enter a valid amount");
      return false;
    }
    if (amount < 50) {
      setAmountError("Minimum recharge amount is ₹50");
      return false;
    }
    if (amount > 10000) {
      setAmountError("Maximum recharge amount is ₹10,000");
      return false;
    }
    if (wallet && wallet.balance + amount > wallet.max_balance) {
      setAmountError(`Recharge would exceed wallet limit of ₹${wallet.max_balance}`);
      return false;
    }
    setAmountError("");
    return true;
  };

  const handleAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount("");
    if (value) {
      const amount = parseFloat(value);
      validateAmount(amount);
    } else {
      setAmountError("");
    }
  };

  const handleQuickAmountSelect = (amount: string) => {
    setSelectedAmount(amount);
    setCustomAmount("");
    const numAmount = parseFloat(amount.replace('₹', ''));
    validateAmount(numAmount);
  };

  const handleRecharge = async () => {
    const amount = parseFloat(customAmount || selectedAmount.replace('₹', ''));
    
    if (!validateAmount(amount)) {
      return;
    }

    setProcessing(true);
    try {
      const result = await rechargeWallet(amount, paymentMethod);
      
      if (result) {
        setSuccess(true);
        toast({
          title: "Recharge Initiated",
          description: `₹${amount} will be credited to your wallet shortly.`,
        });
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      }
    } catch (error: any) {
      toast({
        title: "Recharge Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const currentAmount = parseFloat(customAmount || selectedAmount.replace('₹', '') || '0');

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="pt-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-600 mb-2">Recharge Successful!</h2>
            <p className="text-muted-foreground mb-4">
              Your wallet will be credited shortly. Redirecting to dashboard...
            </p>
            <Button onClick={() => navigate('/dashboard')} className="w-full">
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Recharge Your Wallet
          </h1>
          <p className="text-muted-foreground text-lg">
            Add money instantly with secure payment options
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Quick Recharge */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary text-xl">Quick Recharge</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-3">
                {quickAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant={selectedAmount === amount ? "default" : "outline"}
                    className="h-12"
                    onClick={() => handleQuickAmountSelect(amount)}
                  >
                    {amount}
                  </Button>
                ))}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Shield className="w-4 h-4" />
                  <span>100% Secure Payments</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-orange-600">
                  <Zap className="w-4 h-4" />
                  <span>Instant Credit</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <DollarSign className="w-4 h-4" />
                  <span>Zero Processing Fee</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recharge Form */}
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div>
                <Label htmlFor="amount" className="text-base font-medium">Recharge Amount</Label>
                <div className="mt-2">
                  <Input
                    id="amount"
                    placeholder="Enter amount"
                    value={customAmount || selectedAmount.replace('₹', '')}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    className="text-lg h-12"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Minimum: ₹50, Maximum: ₹10,000
                  </p>
                  {amountError && (
                    <Alert className="mt-2">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        {amountError}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Payment Method</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-3">
                  <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50">
                    <RadioGroupItem value="upi" id="upi" />
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Smartphone className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">UPI</div>
                        <div className="text-sm text-muted-foreground">Pay using any UPI app</div>
                      </div>
                      <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        Instant
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50">
                    <RadioGroupItem value="card" id="card" />
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">Debit/Credit Card</div>
                        <div className="text-sm text-muted-foreground">Visa, Mastercard, RuPay</div>
                      </div>
                      <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        Secure
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50">
                    <RadioGroupItem value="netbanking" id="netbanking" />
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">Net Banking</div>
                        <div className="text-sm text-muted-foreground">All major banks</div>
                      </div>
                      <div className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        Reliable
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <Button 
                className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90"
                disabled={(!selectedAmount && !customAmount) || processing || recharging || !!amountError}
                onClick={handleRecharge}
              >
                {(processing || recharging) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {processing || recharging 
                  ? "Processing..." 
                  : `Proceed to Pay ₹${currentAmount || 0}`
                }
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Recharge;