import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDownUp, ChevronDown } from "lucide-react";

export default function TradingInterface() {
  const [fromAmount, setFromAmount] = useState("1000");
  const [toAmount, setToAmount] = useState("0.298");

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-inch-dark mb-4">Experience the Best Rates</h2>
          <p className="text-xl text-gray-600">
            See how 1inch finds you the most optimized swap paths
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-gray-50 to-white shadow-2xl border border-gray-200">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Swap Panel */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-inch-dark">Token Swap</h3>
                  
                  {/* From Token */}
                  <Card className="bg-white border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600">From</span>
                        <span className="text-sm text-gray-500">Balance: 1,250.00</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <Input 
                          type="text" 
                          placeholder="0.0" 
                          value={fromAmount}
                          onChange={(e) => setFromAmount(e.target.value)}
                          className="text-2xl font-semibold bg-transparent border-none outline-none p-0 h-auto"
                        />
                        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2 cursor-pointer">
                          <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                          <span className="font-semibold">USDC</span>
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
                  <Card className="bg-white border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600">To</span>
                        <span className="text-sm text-gray-500">Balance: 0.45</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <Input 
                          type="text" 
                          placeholder="0.0" 
                          value={toAmount}
                          onChange={(e) => setToAmount(e.target.value)}
                          className="text-2xl font-semibold bg-transparent border-none outline-none p-0 h-auto"
                        />
                        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2 cursor-pointer">
                          <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                          <span className="font-semibold">WETH</span>
                          <ChevronDown className="text-gray-400" size={16} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Swap Button */}
                  <Button className="w-full bg-gradient-to-r from-inch-blue to-inch-purple text-white py-4 text-lg font-semibold hover:opacity-90 transition-opacity">
                    Swap Tokens
                  </Button>
                </div>

                {/* Route Visualization */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-inch-dark">Optimal Route Found</h3>
                  
                  {/* Route Steps */}
                  <div className="space-y-4">
                    <Card className="bg-green-50 border border-green-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-green-800">Best Rate</span>
                          <span className="text-green-600 font-bold">0.298 WETH</span>
                        </div>
                        <div className="text-sm text-green-600">3.2% better than average</div>
                      </CardContent>
                    </Card>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-inch-blue rounded-full"></div>
                        <div className="flex-1">
                          <div className="font-medium">60% via Uniswap V3</div>
                          <div className="text-sm text-gray-500">600 USDC → 0.179 WETH</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-inch-purple rounded-full"></div>
                        <div className="flex-1">
                          <div className="font-medium">40% via Curve</div>
                          <div className="text-sm text-gray-500">400 USDC → 0.119 WETH</div>
                        </div>
                      </div>
                    </div>

                    {/* Gas & Time Info */}
                    <Card className="bg-gray-50">
                      <CardContent className="p-4">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-sm text-gray-600">Gas Fee</div>
                            <div className="font-semibold">$12.50</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Est. Time</div>
                            <div className="font-semibold">~30s</div>
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
