import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRightLeft, Shield, Clock } from "lucide-react";

export default function HackathonTracks() {
  const tracks = [
    {
      id: 1,
      title: "Track 1: Extend Fusion+ to Aptos",
      description: "Build a novel extension for 1inch Cross-chain Swap (Fusion+) that enables swaps between Ethereum and Aptos.",
      color: "from-blue-500 to-teal-500",
      borderColor: "border-blue-200 dark:border-blue-800",
      requirements: [
        "Preserve hashlock and timelock functionality",
        "Bidirectional swap capability (Ethereum ↔ Aptos)",
        "Onchain execution demo on mainnet/testnet"
      ],
      stretchGoals: ["UI implementation", "Enable partial fills"],
      status: "Featured Track"
    },
    {
      id: 2,
      title: "Track 2: Extend Fusion+ to Bitcoin Family",
      description: "Enable swaps between Ethereum and Bitcoin, Dogecoin, Litecoin, or Bitcoin Cash.",
      color: "from-orange-500 to-yellow-500",
      borderColor: "border-orange-200 dark:border-orange-800",
      requirements: [
        "Preserve hashlock and timelock functionality",
        "Bidirectional swap capability (Ethereum ↔ Bitcoin/DOGE/LTC/BCH)",
        "Onchain execution demo on mainnet/testnet"
      ],
      stretchGoals: ["UI implementation", "Enable partial fills"],
      status: "Bitcoin Family"
    },
    {
      id: 3,
      title: "Track 3: Extend Fusion+ to Cosmos",
      description: "Build a novel extension for 1inch Cross-chain Swap (Fusion+) that enables swaps between Ethereum and Cosmos.",
      color: "from-purple-500 to-pink-500",
      borderColor: "border-purple-200 dark:border-purple-800",
      requirements: [
        "Preserve hashlock and timelock functionality",
        "Bidirectional swap capability (Ethereum ↔ Cosmos)",
        "Onchain execution demo on mainnet/testnet"
      ],
      stretchGoals: ["UI implementation", "Enable partial fills"],
      status: "Cosmos Ecosystem"
    },
    {
      id: 4,
      title: "Track 4: Extend Fusion+ to Near",
      description: "Build a novel extension for 1inch Cross-chain Swap (Fusion+) that enables swaps between Ethereum and Near.",
      color: "from-green-500 to-blue-500",
      borderColor: "border-green-200 dark:border-green-800",
      requirements: [
        "Preserve hashlock and timelock functionality",
        "Bidirectional swap capability (Ethereum ↔ Near)",
        "Onchain execution demo on mainnet/testnet"
      ],
      stretchGoals: ["UI implementation", "Enable partial fills"],
      status: "Near Protocol"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-inch-dark dark:text-white mb-4">Hackathon Tracks Overview</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Four distinct tracks to build cross-chain Fusion+ extensions. Each track requires hashlock/timelock security and bidirectional swap functionality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {tracks.map((track) => (
            <Card key={track.id} className={`bg-white dark:bg-gray-900 hover:shadow-xl transition-all duration-300 border-2 ${track.borderColor}`}>
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-8 h-8 bg-gradient-to-r ${track.color} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                        {track.id}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {track.status}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold text-inch-dark dark:text-white mb-3">
                      {track.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {track.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Requirements */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      Qualification Requirements
                    </h4>
                    <ul className="space-y-2">
                      {track.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <div className="w-1.5 h-1.5 bg-inch-blue rounded-full mt-2 flex-shrink-0"></div>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stretch Goals */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <ArrowRightLeft size={16} className="text-inch-purple" />
                      Stretch Goals
                    </h4>
                    <ul className="space-y-2">
                      {track.stretchGoals.map((goal, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <div className="w-1.5 h-1.5 bg-inch-purple rounded-full mt-2 flex-shrink-0"></div>
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Security Features */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                      <Shield className="w-6 h-6 text-inch-blue mx-auto mb-2" />
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Hashlock</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Security</div>
                    </div>
                    <div className="text-center">
                      <Clock className="w-6 h-6 text-inch-purple mx-auto mb-2" />
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Timelock</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Protection</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-inch-blue to-inch-purple p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Build Cross-Chain Fusion+?</h3>
            <p className="text-lg opacity-90 mb-6">
              Choose your track and start building the future of cross-chain DeFi with 1inch Protocol
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Hashlock Security
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Timelock Protection
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Bidirectional Swaps
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Onchain Execution
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}