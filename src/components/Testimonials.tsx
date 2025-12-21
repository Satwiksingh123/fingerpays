import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      college: "IIT Delhi",
      course: "Computer Science",
      avatar: "PS",
      rating: 5,
      text: "Fingerpays has completely transformed how I handle campus payments. No more carrying cash or worrying about losing my wallet. Just a touch and I'm done!"
    },
    {
      name: "Arjun Patel",
      college: "NIT Trichy",
      course: "Mechanical Engineering",
      avatar: "AP",
      rating: 5,
      text: "The convenience is unmatched. Whether it's buying food at the cafeteria or paying library fines, Fingerpays makes everything instant and secure."
    },
    {
      name: "Sneha Reddy",
      college: "Anna University",
      course: "Information Technology",
      avatar: "SR",
      rating: 5,
      text: "I love the spending analytics feature. It helps me track my expenses and budget better. The app is so intuitive and the fingerprint authentication is super fast!"
    },
    {
      name: "Rohit Kumar",
      college: "Delhi University",
      course: "Economics",
      avatar: "RK",
      rating: 5,
      text: "Best decision I made this semester was switching to Fingerpays. The recharge process is seamless and I never have to wait in long queues for payments anymore."
    },
    {
      name: "Ananya Singh",
      college: "BIT Mesra",
      course: "Electronics Engineering",
      avatar: "AS",
      rating: 5,
      text: "The security features give me complete peace of mind. My parents love that they can track my expenses and I can recharge instantly whenever needed."
    },
    {
      name: "Vikram Joshi",
      college: "Manipal Institute",
      course: "Biotechnology",
      avatar: "VJ",
      rating: 5,
      text: "From hostel mess to campus bookstore, Fingerpays is accepted everywhere. The referral program is also great - I've earned quite a bit by referring friends!"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Students Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied students who have made FingerPay their go-to campus payment solution.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 shadow-card hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.course}</div>
                    <div className="text-xs text-primary font-medium">{testimonial.college}</div>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  "{testimonial.text}"
                </p>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 bg-gradient-primary px-8 py-4 rounded-full text-white">
              <Star className="w-5 h-5 fill-current" />
              <span className="font-semibold">4.9/5</span>
              <span className="text-white/80">• Based on 10,000+ reviews</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;