import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import TrackRecommendation from "@/components/track-recommendation";
import HackathonTracks from "@/components/hackathon-tracks";
import FeaturesSection from "@/components/features-section";
import MultichainSection from "@/components/multichain-section";
import TradingInterface from "@/components/trading-interface";
import MetricsDashboard from "@/components/metrics-dashboard";
import DeveloperPortal from "@/components/developer-portal";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <TrackRecommendation />
      <HackathonTracks />
      <FeaturesSection />
      <MultichainSection />
      <TradingInterface />
      <MetricsDashboard />
      <DeveloperPortal />
      <Footer />
    </div>
  );
}
