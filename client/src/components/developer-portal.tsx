import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Database, List, Copy, GitBranch } from "lucide-react";

export default function DeveloperPortal() {
  const apiFeatures = [
    {
      icon: Code,
      title: "Aggregation API",
      description: "Get the best swap rates across 200+ DEXs with a single API call. Includes gas optimization and route calculations.",
      color: "from-inch-blue to-inch-purple"
    },
    {
      icon: GitBranch,
      title: "Cross-Chain API",
      description: "SuiBridge cross-chain swaps between Ethereum and Sui with hashlock/timelock security. Bidirectional and atomic.",
      color: "from-cyan-500 to-blue-600"
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

  const codeExample = `// Cross-chain swap from Ethereum to Sui
const crossChainSwap = await fetch(
  'https://api.suibridge.io/v1/swap',
  {
    method: 'POST',
    body: JSON.stringify({
      fromChain: 'ethereum',
      toChain: 'sui',
      fromToken: 'USDC',
      toToken: 'SUI',
      amount: '1000000000000000000',
      fromAddress: userAddress,
      toAddress: suiAddress,
      slippage: 1
    })
  }
);

const swapData = await crossChainSwap.json();

// Monitor swap status
const status = await fetch(
  \`https://api.suibridge.io/v1/status/\${swapData.swapId}\`
);

console.log({
  hashlock: swapData.hashlock,
  timelock: swapData.timelock,
  ethereumTx: swapData.ethereumTx,
  suiTx: swapData.suiTx,
  status: status.status
});`;

  return (
    <section id="developers" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-inch-dark dark:text-white mb-4">Developer API</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Integrate SuiBridge cross-chain APIs for Ethereum ↔ Sui swaps with enterprise-grade security and reliability.
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
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}

            <div className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-gradient-to-r from-inch-blue to-inch-purple text-white hover:opacity-90">
                  Hackathon Docs
                </Button>
                <Button variant="outline" className="border-2 border-inch-blue text-inch-blue hover:bg-inch-blue hover:text-white dark:text-white dark:hover:text-inch-blue">
                  Get API Key
                </Button>
              </div>
            </div>
          </div>

          {/* Code Example */}
          <Card className="bg-gray-900 overflow-x-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400 text-sm">Fusion+ Cross-Chain Example</span>
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

        {/* Hackathon Requirements */}
        <Card className="mt-16 bg-gradient-to-r from-inch-blue/10 to-inch-purple/10 dark:from-inch-blue/20 dark:to-inch-purple/20">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-center text-inch-dark dark:text-white mb-8">Hackathon Track 1 Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">✓</span>
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Hashlock & Timelock</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Preserve security mechanisms for non-EVM implementation</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">⟷</span>
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Bidirectional Swaps</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Enable swaps to and from Ethereum & Aptos</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">⚡</span>
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Onchain Execution</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Live demo with mainnet/testnet deployment</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security & Audits */}
        <Card className="mt-16 bg-gray-50 dark:bg-gray-800">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-center text-inch-dark dark:text-white mb-8">Security & Audits</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 text-center">
              {auditors.map((auditor, index) => (
                <Card key={index} className="bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="font-semibold text-gray-700 dark:text-gray-300">{auditor}</div>
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