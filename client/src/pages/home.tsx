import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import SuiFusionDemo from "@/components/sui-fusion-demo"; 
import TechnologySection from "@/components/technology-section";
import FeaturesSection from "@/components/features-section";
import TradingInterface from "@/components/trading-interface";
import MetricsDashboard from "@/components/metrics-dashboard";
import DeveloperPortal from "@/components/developer-portal";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <SuiFusionDemo />
      <TechnologySection />
      <FeaturesSection />
      <TradingInterface />
      <MetricsDashboard />
      <DeveloperPortal />
      <Footer />
    </div>
  );
}
