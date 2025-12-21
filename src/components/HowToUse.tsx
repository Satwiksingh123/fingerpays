import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserPlus, Fingerprint, CreditCard, ShoppingBag } from "lucide-react";
import fingerprintIcon from "@/assets/fingerprint-icon.jpg";
const HowToUse = () => {
  const steps = [{
    icon: UserPlus,
    title: "Sign Up",
    description: "Register with your college email and student ID. Verify your account instantly.",
    step: "01"
  }, {
    icon: Fingerprint,
    title: "Setup Biometric",
    description: "Securely enroll your fingerprint for quick and safe authentication.",
    step: "02"
  }, {
    icon: CreditCard,
    title: "Add Money",
    description: "Recharge your wallet using UPI, cards, or net banking. Instant top-ups available.",
    step: "03"
  }, {
    icon: ShoppingBag,
    title: "Start Paying",
    description: "Pay at any campus location with just your fingerprint. No cash, no cards needed.",
    step: "04"
  }];
  return <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How to Get Started
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get up and running with Fingerpays in just 4 simple steps. It's designed to be intuitive and secure.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => <Card key={index} className="relative p-8 text-center shadow-card hover:shadow-lg transition-all duration-300 group">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {step.step}
                </div>
                
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </Card>)}
          </div>
          
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-3 bg-gradient-card p-6 rounded-2xl shadow-card">
              <img src={fingerprintIcon} alt="Fingerprint" className="w-12 h-12 rounded-lg" />
                <div className="text-left">
                  <div className="font-semibold text-foreground">Ready to start?</div>
                  <div className="text-sm text-muted-foreground">Join thousands of students already using Fingerpays</div>
                </div>
              <Button variant="gradient" size="lg" className="ml-4">
                Download App
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HowToUse;