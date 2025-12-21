import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone, Fingerprint, Shield } from "lucide-react";
import { AuthModal } from "./AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import heroImage from "@/assets/fingerpay-hero.jpg";

const Hero = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      window.location.href = '/dashboard';
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    <section className="min-h-screen bg-gradient-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[80vh]">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left mb-12 lg:mb-0">
            <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-2 mb-6 animate-slide-up">
              <Fingerprint className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Secure • Fast • Campus-Wide</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Pay with Your
              <span className="block bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
                Fingerprint
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl animate-slide-up" style={{ animationDelay: '0.4s' }}>
              The future of campus payments is here. Recharge, pay, and manage your digital wallet with just a touch.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <Button variant="success" size="lg" className="group" onClick={handleGetStarted}>
                {user ? 'Go to Dashboard' : 'Get Started Now'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                Learn More
              </Button>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 animate-slide-up" style={{ animationDelay: '0.8s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white">Mobile First</div>
                  <div className="text-sm text-white/70">Optimized for mobile</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Fingerprint className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white">Biometric</div>
                  <div className="text-sm text-white/70">Secure authentication</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white">Secure</div>
                  <div className="text-sm text-white/70">Bank-level security</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Phone Mockup */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-500 rounded-3xl blur-2xl opacity-30 scale-110"></div>
              <img 
                src={heroImage} 
                alt="Fingerpays Mobile App Interface" 
                className="relative z-10 max-w-md w-full h-auto rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Hero;