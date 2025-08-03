import { Card, CardContent } from "@/components/ui/card";
import { ArrowRightLeft, Shield, Zap, Code, TrendingUp, Lock, Check } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: ArrowRightLeft,
      title: "Ethereum ↔ Sui Bridge",
      description: "Seamlessly transfer assets between Ethereum and Sui networks with atomic security and instant settlement.",
      gradient: "from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950",
      borderColor: "border-cyan-100 dark:border-cyan-800",
      iconGradient: "from-cyan-500 to-blue-600",
      benefits: [
        "Atomic swaps",
        "Zero slippage", 
        "Instant settlement"
      ]
    },
    {
      icon: Shield,
      title: "Hashlock Security",
      description: "Cryptographic hashlock protection ensures your funds are secure with zero counterparty risk during transfers.",
      gradient: "from-green-50 to-teal-50 dark:from-green-950 dark:to-teal-950",
      borderColor: "border-green-100 dark:border-green-800",
      iconGradient: "from-green-500 to-teal-500",
      benefits: [
        "Zero counterparty risk",
        "Cryptographic proof",
        "Automatic refunds"
      ]
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Experience sub-3 second finality with parallel execution on both Ethereum and Sui networks.",
      gradient: "from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950",
      borderColor: "border-yellow-100 dark:border-yellow-800",
      iconGradient: "from-yellow-500 to-orange-500",
      benefits: [
        "Sub-3s finality",
        "Parallel execution",
        "High throughput"
      ]
    }
  ];

  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-inch-dark dark:text-white mb-4">Core Features</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Professional-grade cross-chain infrastructure with enterprise security and lightning-fast performance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className={`group bg-gradient-to-br ${feature.gradient} hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${feature.borderColor} border`}>
              <CardContent className="p-8">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.iconGradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="text-white text-2xl" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-inch-dark dark:text-white mb-4">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center">
                      <Check className="text-green-500 mr-2" size={16} />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}