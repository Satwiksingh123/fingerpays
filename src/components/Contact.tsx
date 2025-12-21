import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, MessageCircle, HeadphonesIcon } from "lucide-react";
const Contact = () => {
  return <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions or need support? We're here to help you 24/7. Reach out to us anytime.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>
                <div className="space-y-6">
                  
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Phone Support</div>
                      <div className="text-muted-foreground">+91 9027052701</div>
                      <div className="text-sm text-primary">24/7 Available</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Email Support</div>
                      <div className="text-muted-foreground">fingerpays@gmail.com</div>
                      <div className="text-sm text-primary">Response within 2 hours</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Headquarters</div>
                      <div className="text-muted-foreground">SRM Engineering College, Ghazhiabad 201204<br />Karnataka, India - 560095</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Business Hours</div>
                      <div className="text-muted-foreground">Mon - Fri: 9:00 AM - 6:00 PM
Sat - Sun: 10:00 AM - 6:00 PM<br />Sat - Sun: 10:00 AM - 6:00 PM</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Support Options */}
              <Card className="p-6 shadow-card">
                <h4 className="text-lg font-semibold text-foreground mb-4">Quick Support</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <MessageCircle className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Live Chat</div>
                      <div className="text-xs text-muted-foreground">Available now</div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <HeadphonesIcon className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Call Support</div>
                      <div className="text-xs text-muted-foreground">24/7 service</div>
                    </div>
                  </Button>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="p-8 shadow-card">
              <h3 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First Name
                    </label>
                    <Input placeholder="John" className="w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Name
                    </label>
                    <Input placeholder="Doe" className="w-full" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input type="email" placeholder="john.doe@college.edu" className="w-full" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Student ID </label>
                  <Input placeholder="CS21B001" className="w-full" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <Input placeholder="How can we help you?" className="w-full" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea placeholder="Tell us more about your inquiry..." className="w-full min-h-[120px]" />
                </div>
                
                <Button variant="gradient" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
              
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <div className="text-sm text-muted-foreground">
                  <strong>Note:</strong> For urgent issues related to transactions or account security, 
                  please call our 24/7 helpline at 9027052701 for immediate assistance.
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>;
};
export default Contact;