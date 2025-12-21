import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from './AuthModal';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-gradient-primary">
          <div className="text-center text-white p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
            <h1 className="text-3xl font-bold mb-4">Authentication Required</h1>
            <p className="text-lg mb-6 text-white/90">
              Please sign in to access your Fingerpays wallet
            </p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-white text-primary font-semibold py-3 px-8 rounded-lg hover:bg-white/90 transition-colors"
            >
              Sign In / Sign Up
            </button>
          </div>
        </div>
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      </>
    );
  }

  return <>{children}</>;
};