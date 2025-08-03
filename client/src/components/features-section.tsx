import { Card, CardContent } from "@/components/ui/card";
import { Network, List, Shield, Check } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Network,
      title: "Aggregation Protocol",
      description: "Advanced Pathfinder Algorithm finds the best possible paths for token swaps by sourcing liquidity from multiple DEXs in the shortest possible time.",
      gradient: "from-blue-50 to-purple-50",
      borderColor: "border-blue-100",
      iconGradient: "from-inch-blue to-inch-purple",
      benefits: [
        "Multi-DEX sourcing",
        "Market depth optimization", 
        "Gas cost minimization"
      ]
    },
    {
      icon: List,
      title: "Limit Order Protocol",
      description: "The most innovative and flexible limit order swap opportunities in DeFi with zero fees and advanced conditional features.",
      gradient: "from-purple-50 to-pink-50",
      borderColor: "border-purple-100",
      iconGradient: "from-inch-purple to-pink-500",
      benefits: [
        "Zero fees",
        "Dynamic pricing",
        "Stop-loss & trailing orders"
      ]
    },
    {
      icon: Shield,
      title: "Fusion Mode",
      description: "Gasless trading with MEV protection. Professional market makers execute swaps efficiently while protecting users from MEV attacks.",
      gradient: "from-green-50 to-teal-50",
      borderColor: "border-green-100",
      iconGradient: "from-green-500 to-teal-500",
      benefits: [
        "Gasless execution",
        "MEV protection",
        "Optimal rates"
      ]
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-inch-dark mb-4">Three Protocols, One Ecosystem</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            1inch Network unites decentralized protocols whose synergy enables the most optimized DeFi operations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className={`group bg-gradient-to-br ${feature.gradient} hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${feature.borderColor} border`}>
              <CardContent className="p-8">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.iconGradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="text-white text-2xl" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-inch-dark mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
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
