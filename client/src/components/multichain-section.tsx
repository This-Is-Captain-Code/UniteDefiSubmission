import { Card, CardContent } from "@/components/ui/card";

export default function MultichainSection() {
  const chains = [
    { name: "Ethereum", symbol: "ETH", color: "bg-gray-800", icon: "⟠" },
    { name: "Polygon", symbol: "MATIC", color: "bg-purple-600", icon: "⬟" },
    { name: "BNB Chain", symbol: "BNB", color: "bg-yellow-500", icon: "◆" },
    { name: "Avalanche", symbol: "AVAX", color: "bg-red-500", icon: "▲" },
    { name: "Fantom", symbol: "FTM", color: "bg-blue-600", icon: "👻" },
    { name: "More", symbol: "+10", color: "bg-gradient-to-r from-inch-blue to-inch-purple", icon: "+" }
  ];

  const dexProtocols = [
    "Uniswap V2/V3", "SushiSwap", "Curve", "Balancer", "PancakeSwap", "Kyber",
    "DODO", "Mooniswap", "Bancor", "0x Protocol", "Oasis", "+190 More"
  ];

  return (
    <section id="protocols" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-inch-dark mb-4">Multi-Chain Universe</h2>
          <p className="text-xl text-gray-600">
            Trade seamlessly across the most popular blockchain networks
          </p>
        </div>

        {/* Chain Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12">
          {chains.map((chain, index) => (
            <Card key={index} className="bg-white hover:shadow-lg transition-shadow group cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 mx-auto mb-3 ${chain.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <span className="text-white font-bold text-sm">{chain.icon}</span>
                </div>
                <div className="font-semibold text-gray-800">{chain.name}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Supported DEXs */}
        <Card className="bg-white shadow-lg">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-center text-inch-dark mb-8">200+ Supported DEX Protocols</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center text-sm text-gray-600">
              {dexProtocols.map((protocol, index) => (
                <div key={index} className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
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
