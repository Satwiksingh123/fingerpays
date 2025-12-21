import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How secure is Fingerpays?",
      answer: "Fingerpays uses bank-level security with 256-bit encryption. Your biometric data is stored locally on your device and never transmitted to our servers. All transactions are protected with multi-layer security protocols."
    },
    {
      question: "What happens if my fingerprint doesn't work?",
      answer: "You can use backup authentication methods including PIN, pattern, or facial recognition. We also provide 24/7 customer support to help resolve any authentication issues quickly."
    },
    {
      question: "Which colleges support Fingerpays?",
      answer: "Fingerpays is currently available in 50+ colleges across India, including IITs, NITs, and major state universities. We're rapidly expanding to more institutions every month."
    },
    {
      question: "How do I recharge my wallet?",
      answer: "You can add money instantly using UPI, debit/credit cards, net banking, or through our partner locations on campus. Minimum recharge is ₹50 with no maximum limit."
    },
    {
      question: "Are there any transaction fees?",
      answer: "Fingerpays doesn't charge any transaction fees for campus payments. Wallet recharges via UPI are free, while card payments may have minimal charges as per your bank's policy."
    },
    {
      question: "Can I use Fingerpays outside campus?",
      answer: "Currently, Fingerpays is designed specifically for campus transactions. However, we're working on expanding to nearby establishments frequented by students like cafes, bookstores, and transportation services."
    },
    {
      question: "What if I lose my phone?",
      answer: "Immediately contact our support team to temporarily freeze your account. You can then access your wallet from any device using your credentials. Your fingerprint data remains secure as it's stored locally on your device."
    },
    {
      question: "How do I track my spending?",
      answer: "The Fingerpays app provides detailed analytics including daily, weekly, and monthly spending reports. You can set budget limits and receive notifications when you approach your spending goals."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Got questions? We've got answers. Find everything you need to know about Fingerpays.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8 shadow-card">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <span className="font-semibold text-foreground">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FAQ;