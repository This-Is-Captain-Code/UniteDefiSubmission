import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Code, Lock, ArrowRightLeft, Clock } from "lucide-react";

export default function TechnologySection() {
  const technologies = [
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: "Hashlock Security",
      description: "SHA-256 cryptographic locks ensure atomic swaps with zero counterparty risk",
      features: ["Cryptographic proof", "Atomic operations", "Zero trust required"]
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      title: "Timelock Protection",
      description: "24-hour timelock mechanism provides automatic refund protection",
      features: ["Automatic refunds", "Time-bound execution", "Fail-safe recovery"]
    },
    {
      icon: <Code className="w-8 h-8 text-purple-500" />,
      title: "Move Smart Contracts",
      description: "Native Sui Move contracts optimized for cross-chain operations",
      features: ["Object-centric design", "Gas efficient", "Formally verified"]
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Lightning Fast",
      description: "Sub-second transaction finality on both Ethereum and Sui networks",
      features: ["Parallel execution", "Low latency", "High throughput"]
    }
  ];

  const securityFeatures = [
    "End-to-end encryption",
    "Multi-signature validation",
    "Automated compliance checks",
    "Real-time monitoring",
    "Audit trail logging",
    "Emergency pause mechanisms"
  ];

  return (
    <section id="technology" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-950 dark:to-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Lock className="w-8 h-8 text-cyan-500" />
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Advanced Technology Stack</h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Built on cutting-edge blockchain technology with enterprise-grade security and performance
          </p>
        </div>

        {/* Core Technologies */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {technologies.map((tech, index) => (
            <Card key={index} className="bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">{tech.icon}</div>
                <CardTitle className="text-lg">{tech.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {tech.description}
                </p>
                <div className="space-y-1">
                  {tech.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Security Features */}
        <Card className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white mb-16">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6" />
                  <h3 className="text-2xl font-bold">Enterprise Security</h3>
                </div>
                <p className="text-cyan-100 mb-6">
                  Built with institutional-grade security measures and compliance standards to protect your assets and transactions.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {securityFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <ArrowRightLeft className="w-4 h-4 text-cyan-200" />
                      <span className="text-sm text-cyan-100">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                  <div className="text-4xl font-bold mb-2">99.9%</div>
                  <div className="text-cyan-200 mb-4">Uptime Guarantee</div>
                  <div className="text-3xl font-bold mb-2">$0</div>
                  <div className="text-cyan-200 mb-4">Failed Transactions</div>
                  <div className="text-3xl font-bold mb-2">&lt;3s</div>
                  <div className="text-cyan-200">Average Settlement</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5 text-purple-500" />
                Smart Contracts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Sui Move</span>
                  <Badge className="bg-purple-100 text-purple-800">Native</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Ethereum Solidity</span>
                  <Badge className="bg-blue-100 text-blue-800">EVM</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Gas Optimization</span>
                  <Badge className="bg-green-100 text-green-800">Advanced</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">TPS Capacity</span>
                  <Badge className="bg-yellow-100 text-yellow-800">120K+</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Finality Time</span>
                  <Badge className="bg-green-100 text-green-800">&lt;3s</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Cross-chain</span>
                  <Badge className="bg-blue-100 text-blue-800">Instant</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                Security Audits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Smart Contracts</span>
                  <Badge className="bg-green-100 text-green-800">Verified</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Penetration Testing</span>
                  <Badge className="bg-green-100 text-green-800">Passed</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Bug Bounty</span>
                  <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}