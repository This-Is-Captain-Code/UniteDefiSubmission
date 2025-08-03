import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownUp, ChevronDown, Clock, Shield } from "lucide-react";

export default function TradingInterface() {
  const [fromAmount, setFromAmount] = useState("1000");
  const [toAmount, setToAmount] = useState("0.298");
  const [selectedTrack, setSelectedTrack] = useState("track1");

  const tracks = {
    track1: { name: "Aptos", symbol: "APT", color: "from-blue-500 to-teal-500", amount: "0.298" },
    track2: { name: "Bitcoin", symbol: "BTC", color: "from-orange-500 to-yellow-500", amount: "0.025" },
    track3: { name: "Cosmos", symbol: "ATOM", color: "from-purple-500 to-pink-500", amount: "42.5" },
    track4: { name: "Near", symbol: "NEAR", color: "from-green-500 to-blue-500", amount: "125.0" }
  };

  const currentTrack = tracks[selectedTrack as keyof typeof tracks];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-inch-dark dark:text-white mb-4">Multi-Track Cross-Chain Swaps</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Experience Fusion+ technology across all hackathon tracks: Aptos, Bitcoin, Cosmos, and Near
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
                    <Select value={selectedTrack} onValueChange={setSelectedTrack}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="track1">Track 1</SelectItem>
                        <SelectItem value="track2">Track 2</SelectItem>
                        <SelectItem value="track3">Track 3</SelectItem>
                        <SelectItem value="track4">Track 4</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Button className="w-12 h-12 bg-gradient-to-r from-inch-blue to-inch-purple rounded-full p-0 hover:scale-110 transition-transform">
                      <ArrowDownUp className="text-white" size={20} />
                    </Button>
                  </div>

                  {/* To Token */}
                  <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600 dark:text-gray-300">To ({currentTrack.name})</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Balance: 124.5</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <Input 
                          type="text" 
                          placeholder="0.0" 
                          value={currentTrack.amount}
                          onChange={(e) => setToAmount(e.target.value)}
                          className="text-2xl font-semibold bg-transparent border-none outline-none p-0 h-auto text-gray-900 dark:text-white"
                        />
                        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 cursor-pointer">
                          <div className={`w-6 h-6 bg-gradient-to-r ${currentTrack.color} rounded-full`}></div>
                          <span className="font-semibold text-gray-900 dark:text-white">{currentTrack.symbol}</span>
                          <ChevronDown className="text-gray-400" size={16} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Swap Button */}
                  <Button className="w-full bg-gradient-to-r from-inch-blue to-inch-purple text-white py-4 text-lg font-semibold hover:opacity-90 transition-opacity">
                    Initiate Cross-Chain Swap
                  </Button>
                </div>

                {/* Route Visualization */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-inch-dark dark:text-white">Fusion+ Route</h3>
                  
                  {/* Route Steps */}
                  <div className="space-y-4">
                    <Card className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-green-800 dark:text-green-200">Best Cross-Chain Rate</span>
                          <span className="text-green-600 dark:text-green-400 font-bold">{currentTrack.amount} {currentTrack.symbol}</span>
                        </div>
                        <div className="text-sm text-green-600 dark:text-green-400">Hashlock & Timelock protected</div>
                      </CardContent>
                    </Card>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-inch-blue rounded-full"></div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-white">Step 1: Lock on Ethereum</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">1000 USDC locked with hashlock</div>
                        </div>
                        <Clock className="text-inch-blue" size={16} />
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-inch-purple rounded-full"></div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-white">Step 2: Lock on {currentTrack.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{currentTrack.amount} {currentTrack.symbol} locked with same hash</div>
                        </div>
                        <Shield className="text-inch-purple" size={16} />
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