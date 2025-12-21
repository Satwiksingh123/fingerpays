import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WalletDashboard from "@/components/WalletDashboard";
import HowToUse from "@/components/HowToUse";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import ReferEarn from "@/components/ReferEarn";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <section id="how-to-use">
        <HowToUse />
      </section>
      <section id="reviews">
        <Testimonials />
      </section>
      <section id="faq">
        <FAQ />
      </section>
      <ReferEarn />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
