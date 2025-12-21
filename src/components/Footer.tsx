import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Fingerprint, Twitter, Instagram, Linkedin, Youtube, Mail } from "lucide-react";
const Footer = () => {
  return <footer className="bg-primary-dark text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Fingerprint className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Fingerpays</span>
            </div>
            <p className="text-white/80 leading-relaxed">
              The future of campus payments. Secure, fast, and convenient digital wallet solution for students across India.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Youtube className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">How it Works</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Supported Colleges</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Merchant Partners</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Report Issue</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-white/80 mb-4">
              Subscribe to our newsletter for updates, tips, and exclusive offers.
            </p>
            <div className="space-y-3">
              <Input type="email" placeholder="Enter your email" className="bg-white/10 border-white/20 text-white placeholder:text-white/60" />
              <Button variant="success" className="w-full">
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/80 text-sm">© 2025 Fingerpays. All rights reserved.</div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-white/80 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;