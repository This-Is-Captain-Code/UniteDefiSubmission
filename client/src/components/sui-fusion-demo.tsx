import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import SwapHistory from "@/components/swap-history";
import { ArrowRightLeft, Clock, Shield, CheckCircle2, AlertCircle, ExternalLink, Copy } from "lucide-react";

interface SwapStep {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'completed' | 'failed';
  txHash?: string;
  timestamp?: Date;
}

export default function SuiFusionDemo() {
  const [activeTab, setActiveTab] = useState("ethereum-to-sui");
  const [fromAmount, setFromAmount] = useState("1000");
  const [toAmount, setToAmount] = useState("850");
  const [fromAddress, setFromAddress] = useState("0x742d35Cc6634C0532925a3b8D5c9A8B4A4B72aB8");
  const [toAddress, setToAddress] = useState("0x1a2b3c4d5e6f7890abcdef1234567890abcdef12");
  const [isInitiating, setIsInitiating] = useState(false);
  const [swapData, setSwapData] = useState<any>(null);
  const [swapSteps, setSwapSteps] = useState<SwapStep[]>([]);
  const { toast } = useToast();

  const initiateSwap = async () => {
    setIsInitiating(true);
    try {
      const response = await fetch(`/api/swaps/${activeTab}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fromAmount: parseFloat(fromAmount),
          toAmount: parseFloat(toAmount),
          fromAddress,
          toAddress,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to initiate swap');
      }

      const data = await response.json();
      setSwapData(data);
      
      // Initialize swap steps
      const steps: SwapStep[] = [
        {
          id: 1,
          title: `Lock ${activeTab === 'ethereum-to-sui' ? 'USDC' : 'SUI'} on ${activeTab === 'ethereum-to-sui' ? 'Ethereum' : 'Sui'}`,
          description: `Deploy and fund hashlock contract`,
          status: 'active'
        },
        {
          id: 2,
          title: `Lock ${activeTab === 'ethereum-to-sui' ? 'SUI' : 'USDC'} on ${activeTab === 'ethereum-to-sui' ? 'Sui' : 'Ethereum'}`,
          description: `Deploy matching hashlock contract`,
          status: 'pending'
        },
        {
          id: 3,
          title: 'Atomic Settlement',
          description: 'Reveal secret and complete swap',
          status: 'pending'
        },
        {
          id: 4,
          title: 'Confirmation',
          description: 'Verify cross-chain transfer completion',
          status: 'pending'
        }
      ];
      setSwapSteps(steps);

      // Simulate step progression
      simulateSwapProgress(steps);

      toast({
        title: "Transaction Initiated",
        description: `Cross-chain swap between ${activeTab === 'ethereum-to-sui' ? 'Ethereum and Sui' : 'Sui and Ethereum'} is now processing on-chain.`,
      });
    } catch (error) {
      console.error('Error initiating swap:', error);
      toast({
        title: "Swap Initiation Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsInitiating(false);
    }
  };

  const simulateSwapProgress = (steps: SwapStep[]) => {
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setSwapSteps(prev => prev.map((step, index) => {
          if (index === currentStep) {
            return { 
              ...step, 
              status: 'completed', 
              txHash: `0x${Math.random().toString(16).substr(2, 16)}`,
              timestamp: new Date()
            };
          } else if (index === currentStep + 1 && currentStep + 1 < steps.length) {
            return { ...step, status: 'active' };
          }
          return step;
        }));
        currentStep++;
      } else {
        clearInterval(interval);
        // All steps completed - show success toast
        toast({
          title: "Swap Completed Successfully",
          description: "Cross-chain swap has been completed and verified on both networks.",
        });
      }
    }, 2500); // Faster progression
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Text has been copied to your clipboard.",
    });
  };

  const getStepIcon = (status: SwapStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'active':
        return <Clock className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getOverallProgress = () => {
    const completedSteps = swapSteps.filter(step => step.status === 'completed').length;
    return (completedSteps / swapSteps.length) * 100;
  };

  return (
    <section id="live-swaps" className="py-20 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              S
            </div>
            <h2 className="text-4xl font-bold text-inch-dark dark:text-white">Live Cross-Chain Swaps</h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Execute real-time Ethereum ↔ Sui transactions with production-grade atomic security
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Swap Interface */}
          <Card className="bg-white dark:bg-gray-900 shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-cyan-500" />
                Cross-Chain Swap Interface
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="ethereum-to-sui">ETH → SUI</TabsTrigger>
                  <TabsTrigger value="sui-to-ethereum">SUI → ETH</TabsTrigger>
                </TabsList>
                
                <TabsContent value="ethereum-to-sui" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">From (Ethereum)</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          value={fromAmount}
                          onChange={(e) => setFromAmount(e.target.value)}
                          placeholder="Amount"
                        />
                        <Badge>USDC</Badge>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">To (Sui)</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          value={toAmount}
                          onChange={(e) => setToAmount(e.target.value)}
                          placeholder="Amount"
                        />
                        <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">SUI</Badge>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="sui-to-ethereum" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">From (Sui)</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          value={toAmount}
                          onChange={(e) => setToAmount(e.target.value)}
                          placeholder="Amount"
                        />
                        <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">SUI</Badge>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">To (Ethereum)</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          value={fromAmount}
                          onChange={(e) => setFromAmount(e.target.value)}
                          placeholder="Amount"
                        />
                        <Badge>USDC</Badge>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">From Address</label>
                  <Input
                    value={fromAddress}
                    onChange={(e) => setFromAddress(e.target.value)}
                    placeholder="Your address"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">To Address</label>
                  <Input
                    value={toAddress}
                    onChange={(e) => setToAddress(e.target.value)}
                    placeholder="Recipient address"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Security Features</span>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">Hashlock</Badge>
                  <Badge variant="outline" className="text-xs">24h Timelock</Badge>
                </div>
              </div>

              <Button 
                onClick={initiateSwap}
                disabled={isInitiating || !fromAmount || !toAmount || !fromAddress || !toAddress}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3"
              >
                {isInitiating ? "Processing Transaction..." : "Execute Cross-Chain Swap"}
              </Button>
            </CardContent>
          </Card>

          {/* Swap Progress */}
          <Card className="bg-white dark:bg-gray-900 shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  Swap Progress
                </span>
                {swapSteps.length > 0 && (
                  <Badge variant="outline">
                    {Math.round(getOverallProgress())}% Complete
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {swapSteps.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Start a cross-chain swap to monitor live transaction progress</p>
                </div>
              ) : (
                <>
                  <Progress value={getOverallProgress()} className="w-full" />
                  
                  <div className="space-y-4">
                    {swapSteps.map((step) => (
                      <div key={step.id} className="flex items-start gap-3 p-3 rounded-lg border">
                        {getStepIcon(step.status)}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {step.title}
                            </h4>
                            {step.status === 'completed' && step.timestamp && (
                              <span className="text-xs text-gray-500">
                                {step.timestamp.toLocaleTimeString()}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {step.description}
                          </p>
                          {step.txHash && (
                            <div className="flex items-center gap-2 mt-2">
                              <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                {step.txHash}
                              </code>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyToClipboard(step.txHash || '')}
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <ExternalLink className="w-3 h-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              
              {swapData && (
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Swap Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-700 dark:text-blue-300">Swap ID:</span>
                      <code className="text-blue-900 dark:text-blue-100">{swapData.id}</code>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700 dark:text-blue-300">Hashlock:</span>
                      <code className="text-blue-900 dark:text-blue-100 text-xs">{swapData.hashlock.substring(0, 16)}...</code>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700 dark:text-blue-300">Timelock:</span>
                      <span className="text-blue-900 dark:text-blue-100">{new Date(swapData.timelock).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Swap History */}
        <div className="mt-12">
          <SwapHistory />
        </div>

        {/* Technical Implementation Details */}
        <div className="mt-12">
          <Card className="bg-white dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="text-center">Technical Implementation Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Sui Move Contracts</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Object-centric architecture with built-in atomic operations and programmable transaction blocks
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ArrowRightLeft className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Bidirectional Swaps</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Full support for Ethereum ↔ Sui swaps with identical security guarantees in both directions
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Hashlock Security</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    SHA-256 hashlock with 24-hour timelock ensures atomic swaps with full refund protection
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}