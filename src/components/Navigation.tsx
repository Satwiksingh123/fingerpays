import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Menu, User, LogOut } from "lucide-react";
import { AuthModal } from "./AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const location = useLocation();
  const {
    user,
    signOut
  } = useAuth();
  const {
    toast
  } = useToast();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const closeSheet = () => {
    setIsOpen(false);
  };
  const handleRechargeClick = () => {
    if (user) {
      window.location.href = '/dashboard/recharge';
    } else {
      setShowAuthModal(true);
    }
  };
  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account."
      });
      window.location.href = '/';
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "Please try again.",
        variant: "destructive"
      });
    } finally {
      setShowLogoutDialog(false);
    }
  };
  const publicNavItems = [{
    href: "/",
    label: "Home"
  }, {
    href: "/#how-to-use",
    label: "How to Use"
  }, {
    href: "/#faq",
    label: "FAQ"
  }, {
    href: "/#reviews",
    label: "Reviews"
  }];
  const dashboardNavItems = [{
    href: "/dashboard",
    label: "Dashboard"
  }, {
    href: "/dashboard/recharge",
    label: "Recharge"
  }, {
    href: "/dashboard/transactions",
    label: "Transactions"
  }, {
    href: "/dashboard/profile",
    label: "Profile"
  }];
  return <>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <nav className="bg-white shadow-modern border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">👆</span>
            <span className="text-xl font-bold text-primary">Fingerpays</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {!isDashboard && publicNavItems.map(item => <Link key={item.href} to={item.href} className={`text-sm font-medium transition-colors ${location.pathname === item.href ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                {item.label}
              </Link>)}
            
            {isDashboard && dashboardNavItems.map(item => <Link key={item.href} to={item.href} className={`text-sm font-medium transition-colors ${location.pathname === item.href ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                {item.label}
              </Link>)}
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {isDashboard && user ? <>
                <Button variant="ghost" size="sm" className="gap-2" onClick={() => window.location.href = '/dashboard/profile'}>
                  <User className="h-4 w-4" />
                  <span className="hidden xl:inline">Profile</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => setShowLogoutDialog(true)}>
                  <LogOut className="h-4 w-4" />
                  <span className="hidden xl:inline">Sign Out</span>
                </Button>
              </> : <div className="flex items-center gap-3">
                <Button size="sm" className="bg-gradient-primary text-white hover:opacity-90" onClick={handleRechargeClick}>
                  {user ? 'Recharge Wallet' : 'Get Started'}
                </Button>
                {!user && <Button variant="outline" size="sm" onClick={() => setShowAuthModal(true)}>
                    Sign In
                  </Button>}
              </div>}
          </div>
          
          {/* Mobile Actions & Menu */}
          <div className="flex lg:hidden items-center gap-2">
            {isDashboard && user && <Button variant="ghost" size="sm" className="p-2" onClick={() => window.location.href = '/dashboard/profile'}>
                <User className="h-5 w-5" />
              </Button>}
            
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-6 mt-6">
                  {/* Logo in mobile menu */}
                  <div className="flex items-center gap-2 pb-4 border-b border-border">
                    <span className="text-2xl">👆</span>
                    <span className="text-xl font-bold text-primary">Fingerpays</span>
                  </div>
                  
                  {/* Navigation Links */}
                  <div className="flex flex-col gap-4">
                    {!isDashboard && publicNavItems.map(item => <Link key={item.href} to={item.href} onClick={() => setIsOpen(false)} className={`text-base font-medium transition-colors py-2 ${location.pathname === item.href ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
                        {item.label}
                      </Link>)}
                    
                    {isDashboard && dashboardNavItems.map(item => <Link key={item.href} to={item.href} onClick={() => setIsOpen(false)} className={`text-base font-medium transition-colors py-2 ${location.pathname === item.href ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
                        {item.label}
                      </Link>)}
                  </div>
                  
                    {/* Mobile Actions */}
                    <div className="flex flex-col gap-3 pt-4 border-t border-border">
                      {isDashboard && user ? <>
                          <Button variant="outline" className="w-full justify-start gap-2" onClick={() => {
                        closeSheet();
                        window.location.href = '/dashboard/profile';
                      }}>
                            <User className="h-4 w-4" />
                            View Profile
                          </Button>
                          <Button variant="destructive" className="w-full justify-start gap-2" onClick={() => {
                        closeSheet();
                        setShowLogoutDialog(true);
                      }}>
                            <LogOut className="h-4 w-4" />
                            Sign Out
                          </Button>
                        </> : <div className="space-y-3">
                          <Button className="w-full bg-gradient-primary text-white hover:opacity-90" onClick={() => {
                        closeSheet();
                        handleRechargeClick();
                      }}>
                            {user ? 'Recharge Wallet' : 'Get Started'}
                          </Button>
                          {!user && <Button variant="outline" className="w-full" onClick={() => {
                        closeSheet();
                        setShowAuthModal(true);
                      }}>
                              Sign In
                            </Button>}
                        </div>}
                    </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>

    {/* Logout Confirmation Dialog */}
    <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
      <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign Out</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to sign out of your Fingerpays account?
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSignOut}>Sign Out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>;
};
export default Navigation;