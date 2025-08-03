import { Card, CardContent } from "@/components/ui/card";

export default function MultichainSection() {
  const chains = [
    { name: "Ethereum", symbol: "ETH", color: "bg-gray-800", icon: "⟠", track: "Base Chain" },
    { name: "Aptos", symbol: "APT", color: "bg-gradient-to-r from-blue-500 to-teal-500", icon: "🅰️", track: "Track 1" },
    { name: "Bitcoin", symbol: "BTC", color: "bg-orange-500", icon: "₿", track: "Track 2" },
    { name: "Dogecoin", symbol: "DOGE", color: "bg-yellow-600", icon: "Ð", track: "Track 2" },
    { name: "Cosmos", symbol: "ATOM", color: "bg-gradient-to-r from-purple-500 to-pink-500", icon: "⚛️", track: "Track 3" },
    { name: "Near", symbol: "NEAR", color: "bg-gradient-to-r from-green-500 to-blue-500", icon: "🟢", track: "Track 4" }
  ];

  const dexProtocols = [
    "Uniswap V2/V3", "SushiSwap", "Curve", "Balancer", "PancakeSwap", "Kyber",
    "DODO", "Mooniswap", "Bancor", "0x Protocol", "Oasis", "+190 More"
  ];

  return (
    <section id="protocols" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-inch-dark dark:text-white mb-4">Hackathon Cross-Chain Universe</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Build cross-chain Fusion+ extensions across 4 different tracks: Aptos, Bitcoin family, Cosmos, and Near
          </p>
        </div>

        {/* Chain Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {chains.map((chain, index) => (
            <Card key={index} className="bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow group cursor-pointer border-2 hover:border-inch-blue">
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 mx-auto mb-3 ${chain.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <span className="text-white font-bold text-sm">{chain.icon}</span>
                </div>
                <div className="font-semibold text-gray-800 dark:text-gray-200">{chain.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{chain.track}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Supported DEXs */}
        <Card className="bg-white dark:bg-gray-900 shadow-lg">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-center text-inch-dark dark:text-white mb-8">200+ Supported DEX Protocols</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center text-sm text-gray-600 dark:text-gray-300">
              {dexProtocols.map((protocol, index) => (
                <div key={index} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                  {protocol}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}