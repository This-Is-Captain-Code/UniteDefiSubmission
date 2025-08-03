import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Database, List, Copy } from "lucide-react";

export default function DeveloperPortal() {
  const apiFeatures = [
    {
      icon: Code,
      title: "Aggregation API",
      description: "Get the best swap rates across 200+ DEXs with a single API call. Includes gas optimization and route calculations.",
      color: "from-inch-blue to-inch-purple"
    },
    {
      icon: Database,
      title: "Portfolio API",
      description: "Real-time portfolio tracking with historical data, profit/loss calculations, and comprehensive token analytics.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: List,
      title: "Limit Order API",
      description: "Create and manage advanced limit orders with conditional logic, dynamic pricing, and automated execution.",
      color: "from-green-500 to-teal-500"
    }
  ];

  const auditors = [
    "OpenZeppelin", "Consensys", "SlowMist", "CertiK", 
    "Hacken", "MixBytes", "Haechi Labs", "CoinFabrik"
  ];

  const codeExample = `// Get best swap quote
const response = await fetch(
  'https://api.1inch.io/v5.0/1/quote?' +
  'fromTokenAddress=0xA0b86a33E...&' +
  'toTokenAddress=0xC02aaA39b...&' +
  'amount=1000000000000000000'
);

const quote = await response.json();

console.log({
  toTokenAmount: quote.toTokenAmount,
  estimatedGas: quote.estimatedGas,
  protocols: quote.protocols
});

// Execute swap
const swapResponse = await fetch(
  'https://api.1inch.io/v5.0/1/swap',
  {
    method: 'POST',
    body: JSON.stringify({
      fromTokenAddress: '0xA0b86a33E...',
      toTokenAddress: '0xC02aaA39b...',
      amount: '1000000000000000000',
      fromAddress: userAddress,
      slippage: 1
    })
  }
);`;

  return (
    <section id="developers" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-inch-dark mb-4">Build with 1inch</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Integrate 1inch APIs to create fully functional dApps and wallets with real-time pricing, limit orders, and portfolio tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* API Features */}
          <div className="space-y-8">
            {apiFeatures.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <feature.icon className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}

            <div className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-gradient-to-r from-inch-blue to-inch-purple text-white hover:opacity-90">
                  View Documentation
                </Button>
                <Button variant="outline" className="border-2 border-inch-blue text-inch-blue hover:bg-inch-blue hover:text-white">
                  Get API Key
                </Button>
              </div>
            </div>
          </div>

          {/* Code Example */}
          <Card className="bg-gray-900 overflow-x-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400 text-sm">JavaScript Example</span>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white h-8 w-8">
                  <Copy size={16} />
                </Button>
              </div>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{codeExample}</code>
              </pre>
            </CardContent>
          </Card>
        </div>

        {/* Security & Audits */}
        <Card className="mt-16 bg-gray-50">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-center text-inch-dark mb-8">Security & Audits</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 text-center">
              {auditors.map((auditor, index) => (
                <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="font-semibold text-gray-700">{auditor}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
