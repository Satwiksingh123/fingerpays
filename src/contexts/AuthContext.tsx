import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (data: SignUpData) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithOAuth: (provider: 'google' | 'facebook' | 'twitter') => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ error: any }>;
}

interface SignUpData {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  branch: string;
  yearOfStudy: string;
  studentId: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (data: SignUpData) => {
    try {
      setLoading(true);
      const redirectUrl = `${window.location.origin}/dashboard`;

      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: data.fullName,
            phone_number: data.phoneNumber,
            branch: data.branch,
            year_of_study: data.yearOfStudy,
            student_id: data.studentId,
          },
        },
      });

      if (error) {
        let errorMessage = error.message;
        
        // Provide more user-friendly error messages
        if (error.message.includes('already registered')) {
          errorMessage = 'This email is already registered. Please sign in instead.';
        } else if (error.message.includes('invalid email')) {
          errorMessage = 'Please enter a valid email address.';
        } else if (error.message.includes('password')) {
          errorMessage = 'Password does not meet security requirements.';
        }

        toast({
          variant: "destructive",
          title: "Signup Failed",
          description: errorMessage,
        });
        return { error };
      }

      // Check if email confirmation is required (it's disabled in config.toml)
      toast({
        title: "Account Created Successfully!",
        description: "You can now sign in with your credentials.",
        duration: 5000,
      });

      return { error: null };
    } catch (error: any) {
      const errorMessage = error?.message || 'An unexpected error occurred. Please try again.';
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: errorMessage,
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        let errorMessage = error.message;
        
        // Provide more user-friendly error messages
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please check your credentials and try again.';
        } else if (error.message.includes('Email rate limit exceeded')) {
          errorMessage = 'Too many login attempts. Please wait a few minutes and try again.';
        }

        toast({
          variant: "destructive",
          title: "Sign In Failed",
          description: errorMessage,
        });
        return { error };
      }

      toast({
        title: "Welcome back!",
        description: `Signed in as ${data.user?.email}`,
      });

      return { error: null };
    } catch (error: any) {
      const errorMessage = error?.message || 'An unexpected error occurred. Please try again.';
      toast({
        variant: "destructive",
        title: "Sign In Failed",
        description: errorMessage,
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signInWithOAuth = async (provider: 'google' | 'facebook' | 'twitter') => {
    try {
      setLoading(true);
      const redirectUrl = `${window.location.origin}/`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirectUrl,
        },
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "OAuth Sign In Failed",
          description: error.message,
        });
        return { error };
      }

      return { error: null };
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "OAuth Sign In Failed",
        description: error.message,
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();

      if (error) {
        toast({
          variant: "destructive",
          title: "Sign Out Failed",
          description: error.message,
        });
        return { error };
      }

      toast({
        title: "Signed out successfully",
        description: "You've been logged out.",
      });

      return { error: null };
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign Out Failed",
        description: error.message,
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      const redirectUrl = `${window.location.origin}/reset-password`;

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });

      if (error) {
        let errorMessage = error.message;
        
        // Provide more user-friendly error messages
        if (error.message.includes('rate limit')) {
          errorMessage = 'Too many password reset requests. Please wait a few minutes and try again.';
        } else if (error.message.includes('not found')) {
          // Don't reveal if email exists for security, but provide helpful message
          errorMessage = 'If an account exists with this email, you will receive a password reset link.';
        }

        toast({
          variant: "destructive",
          title: "Password Reset Request Failed",
          description: errorMessage,
        });
        return { error };
      }

      toast({
        title: "Password Reset Email Sent!",
        description: "Check your email for a secure link to reset your password. The link will expire in 1 hour.",
        duration: 6000,
      });

      return { error: null };
    } catch (error: any) {
      const errorMessage = error?.message || 'An unexpected error occurred. Please try again.';
      toast({
        variant: "destructive",
        title: "Password Reset Failed",
        description: errorMessage,
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithOAuth,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};