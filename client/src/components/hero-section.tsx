import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRightLeft, Coins, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function HeroSection() {
  const { data: metrics } = useQuery({
    queryKey: ['/api/metrics'],
    queryFn: async () => {
      const response = await fetch('/api/metrics');
      if (!response.ok) throw new Error('Failed to fetch metrics');
      return response.json();
    },
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 gradient-bg"></div>
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-16 h-16 glassmorphism rounded-full flex items-center justify-center">
          <ArrowRightLeft className="text-white text-xl" />
        </div>
      </div>
      <div className="absolute top-40 right-20 animate-float-delayed">
        <div className="w-12 h-12 glassmorphism rounded-lg flex items-center justify-center">
          <Coins className="text-white" />
        </div>
      </div>
      <div className="absolute bottom-32 left-20 animate-float-delayed-2">
        <div className="w-14 h-14 glassmorphism rounded-full flex items-center justify-center">
          <TrendingUp className="text-white text-lg" />
        </div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Sui<span className="text-cyan-300">Bridge</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-200">
            Cross-Chain Future
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
          Revolutionary Ethereum ↔ Sui cross-chain swaps with hashlock security, atomic operations, and lightning-fast settlement powered by Fusion+ technology.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:opacity-90 px-8 py-4 text-lg font-semibold">
            Start Cross-Chain Swap
          </Button>
          <Button size="lg" variant="outline" className="border-2 border-cyan-300 text-cyan-300 hover:bg-cyan-300 hover:text-gray-900 px-8 py-4 text-lg font-semibold">
            View Demo
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <Card className="glassmorphism rounded-xl p-6 border-white/20">
            <div className="text-3xl font-bold text-white">
              {metrics?.totalVolume || '$2.1M'}
            </div>
            <div className="text-gray-300">Cross-Chain Volume</div>
          </Card>
          <Card className="glassmorphism rounded-xl p-6 border-white/20">
            <div className="text-3xl font-bold text-white">
              <span className="text-cyan-300">2</span> Chains
            </div>
            <div className="text-gray-300">Ethereum ↔ Sui</div>
          </Card>
          <Card className="glassmorphism rounded-xl p-6 border-white/20">
            <div className="text-3xl font-bold text-white">
              24<span className="text-cyan-300">h</span>
            </div>
            <div className="text-gray-300">Timelock Security</div>
          </Card>
        </div>
      </div>
    </section>
  );
}