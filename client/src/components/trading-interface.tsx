import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownUp, ChevronDown, Clock, Shield } from "lucide-react";

export default function TradingInterface() {
  const [fromAmount, setFromAmount] = useState("1000");
  const [toAmount, setToAmount] = useState("850.0");
  const [fromToken, setFromToken] = useState("USDC");
  const [toToken, setToToken] = useState("SUI");

  const supportedTokens = {
    ethereum: { name: "Ethereum", symbol: "ETH", color: "from-blue-500 to-purple-600", amount: "2.45", network: "Ethereum" },
    usdc: { name: "USD Coin", symbol: "USDC", color: "from-blue-400 to-blue-600", amount: "5000", network: "Ethereum" },
    usdt: { name: "Tether", symbol: "USDT", color: "from-green-500 to-teal-500", amount: "4800", network: "Ethereum" },
    dai: { name: "Dai", symbol: "DAI", color: "from-orange-500 to-yellow-500", amount: "4950", network: "Ethereum" },
    sui: { name: "Sui", symbol: "SUI", color: "from-cyan-500 to-blue-600", amount: "850.0", network: "Sui" },
    weth: { name: "Wrapped ETH", symbol: "WETH", color: "from-indigo-500 to-purple-600", amount: "2.40", network: "Ethereum" }
  };

  const getCurrentToken = (tokenKey: string) => supportedTokens[tokenKey as keyof typeof supportedTokens] || supportedTokens.usdc;

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-inch-dark dark:text-white mb-4">Ethereum ↔ Sui Bridge</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Seamless cross-chain swaps with atomic security and instant settlement
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Swap Panel */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-inch-dark dark:text-white">Cross-Chain Swap</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Shield className="w-4 h-4" />
                      <span>Atomic Security</span>
                    </div>
                  </div>
                  
                  {/* From Token */}
                  <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600 dark:text-gray-300">From (Ethereum)</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Balance: 1,250.00</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <Input 
                          type="text" 
                          placeholder="0.0" 
                          value={fromAmount}
                          onChange={(e) => setFromAmount(e.target.value)}
                          className="text-2xl font-semibold bg-transparent border-none outline-none p-0 h-auto text-gray-900 dark:text-white"
                        />
                        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 cursor-pointer">
                          <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                          <span className="font-semibold text-gray-900 dark:text-white">USDC</span>
                          <ChevronDown className="text-gray-400" size={16} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Swap Arrow */}
                  <div className="flex justify-center">
                    <Button className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full p-0 hover:scale-110 transition-transform">
                      <ArrowDownUp className="text-white" size={20} />
                    </Button>
                  </div>

                  {/* To Token */}
                  <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600 dark:text-gray-300">To (Sui Network)</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Balance: 124.5</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <Input 
                          type="text" 
                          placeholder="0.0" 
                          value={toAmount}
                          onChange={(e) => setToAmount(e.target.value)}
                          className="text-2xl font-semibold bg-transparent border-none outline-none p-0 h-auto text-gray-900 dark:text-white"
                        />
                        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 cursor-pointer">
                          <div className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></div>
                          <span className="font-semibold text-gray-900 dark:text-white">SUI</span>
                          <ChevronDown className="text-gray-400" size={16} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Swap Button */}
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 text-lg font-semibold hover:opacity-90 transition-opacity">
                    Initiate Cross-Chain Swap
                  </Button>
                </div>

                {/* Route Visualization */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-inch-dark dark:text-white">Bridge Route</h3>
                  
                  {/* Route Steps */}
                  <div className="space-y-4">
                    <Card className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-green-800 dark:text-green-200">Best Cross-Chain Rate</span>
                          <span className="text-green-600 dark:text-green-400 font-bold">{toAmount} SUI</span>
                        </div>
                        <div className="text-sm text-green-600 dark:text-green-400">Hashlock & Timelock protected</div>
                      </CardContent>
                    </Card>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-white">Step 1: Lock on Ethereum</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{fromAmount} USDC locked with hashlock</div>
                        </div>
                        <Clock className="text-blue-500" size={16} />
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-white">Step 2: Lock on Sui</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{toAmount} SUI locked with same hash</div>
                        </div>
                        <Shield className="text-cyan-500" size={16} />
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-white">Step 3: Atomic Settlement</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Simultaneous unlock on both chains</div>
                        </div>
                      </div>
                    </div>

                    {/* Security Info */}
                    <Card className="bg-gray-50 dark:bg-gray-800">
                      <CardContent className="p-4">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">Timelock</div>
                            <div className="font-semibold text-gray-900 dark:text-white">24 hours</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">Security</div>
                            <div className="font-semibold text-gray-900 dark:text-white">Hashlock</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}