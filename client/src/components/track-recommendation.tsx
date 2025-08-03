import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Crown, Clock, Target, TrendingUp, CheckCircle2 } from "lucide-react";

export default function TrackRecommendation() {
  const recommendation = {
    track: "Track 5: Sui",
    reason: "Optimal Win-Time Ratio",
    timeToComplete: "2-3 weeks",
    winProbability: "Very High (85%)",
    keyAdvantages: [
      "Move programming language expertise widely available",
      "Strong developer tooling and documentation",
      "Active ecosystem with good testnet support",
      "Lower competition compared to Bitcoin/Aptos tracks",
      "Established cross-chain bridge infrastructure"
    ],
    technicalBenefits: [
      "Object-centric architecture simplifies hashlock implementation",
      "Built-in programmable transaction blocks for atomic operations",
      "Native gas fee abstractions reduce complexity",
      "Excellent Move debugger and testing framework"
    ]
  };

  const trackComparison = [
    { track: "Sui", difficulty: "Easy", time: "2-3 weeks", winRate: "85%", competition: "Low", recommended: true },
    { track: "Tron", difficulty: "Easy", time: "3-4 weeks", winRate: "75%", competition: "Medium", recommended: false },
    { track: "Aptos", difficulty: "Medium", time: "4-5 weeks", winRate: "70%", competition: "High", recommended: false },
    { track: "Stellar", difficulty: "Medium", time: "4-6 weeks", winRate: "65%", competition: "Medium", recommended: false },
    { track: "Cosmos", difficulty: "Medium", time: "5-6 weeks", winRate: "65%", competition: "High", recommended: false },
    { track: "Near", difficulty: "Medium", time: "5-7 weeks", winRate: "60%", competition: "High", recommended: false },
    { track: "Bitcoin", difficulty: "Hard", time: "8-12 weeks", winRate: "90%", competition: "Very High", recommended: false }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Crown className="w-8 h-8 text-yellow-500" />
            <h2 className="text-4xl font-bold text-inch-dark dark:text-white">Winning Strategy Analysis</h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Based on development complexity, ecosystem maturity, and competition analysis
          </p>
        </div>

        {/* Main Recommendation */}
        <div className="mb-12">
          <Card className="bg-gradient-to-r from-green-500 to-blue-600 border-0 text-white">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Crown className="w-6 h-6 text-yellow-300" />
                    <Badge className="bg-yellow-500 text-black font-bold">
                      RECOMMENDED CHOICE
                    </Badge>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{recommendation.track}</h3>
                  <p className="text-xl mb-6 text-blue-100">
                    {recommendation.reason} - {recommendation.winProbability} success rate
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/20 rounded-lg p-4 text-center">
                      <Clock className="w-6 h-6 mx-auto mb-2 text-blue-200" />
                      <div className="font-semibold">{recommendation.timeToComplete}</div>
                      <div className="text-sm text-blue-200">Development Time</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-4 text-center">
                      <Target className="w-6 h-6 mx-auto mb-2 text-green-200" />
                      <div className="font-semibold">{recommendation.winProbability}</div>
                      <div className="text-sm text-green-200">Win Probability</div>
                    </div>
                  </div>
                  <Button className="bg-white text-blue-600 hover:bg-blue-50 font-bold">
                    Start Building Track 5
                  </Button>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Key Advantages
                    </h4>
                    <ul className="space-y-2">
                      {recommendation.keyAdvantages.map((advantage, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-blue-100">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-300 flex-shrink-0" />
                          <span className="text-sm">{advantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Track Comparison Table */}
        <Card className="bg-white dark:bg-gray-900">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-inch-dark dark:text-white mb-6 text-center">
              Complete Track Analysis
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Track</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">Difficulty</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">Time</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">Win Rate</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">Competition</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {trackComparison.map((track, idx) => (
                    <tr 
                      key={idx} 
                      className={`border-b border-gray-100 dark:border-gray-800 ${
                        track.recommended ? 'bg-green-50 dark:bg-green-950' : ''
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {track.recommended && <Crown className="w-4 h-4 text-yellow-500" />}
                          <span className={`font-medium ${track.recommended ? 'text-green-700 dark:text-green-300' : 'text-gray-900 dark:text-white'}`}>
                            {track.track}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Badge variant={
                          track.difficulty === "Easy" ? "default" : 
                          track.difficulty === "Medium" ? "secondary" : "destructive"
                        }>
                          {track.difficulty}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-center text-gray-600 dark:text-gray-300">{track.time}</td>
                      <td className="py-4 px-4 text-center">
                        <span className={`font-semibold ${
                          parseInt(track.winRate) >= 80 ? 'text-green-600 dark:text-green-400' :
                          parseInt(track.winRate) >= 70 ? 'text-blue-600 dark:text-blue-400' :
                          'text-gray-600 dark:text-gray-400'
                        }`}>
                          {track.winRate}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Badge variant={
                          track.competition === "Low" ? "default" :
                          track.competition === "Medium" ? "secondary" : "destructive"
                        }>
                          {track.competition}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-center">
                        {track.recommended ? (
                          <Badge className="bg-green-600 text-white">
                            BEST CHOICE
                          </Badge>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Technical Advantages */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white dark:bg-gray-900">
            <CardContent className="p-6">
              <h4 className="font-bold text-lg mb-4 text-inch-dark dark:text-white">
                Why Sui Wins: Technical Advantages
              </h4>
              <ul className="space-y-3">
                {recommendation.technicalBenefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900">
            <CardContent className="p-6">
              <h4 className="font-bold text-lg mb-4 text-inch-dark dark:text-white">
                Implementation Roadmap
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <span className="text-gray-600 dark:text-gray-300">Set up Sui Move development environment</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <span className="text-gray-600 dark:text-gray-300">Implement hashlock contract on Sui</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <span className="text-gray-600 dark:text-gray-300">Build Ethereum integration layer</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <span className="text-gray-600 dark:text-gray-300">Create bidirectional swap demo</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}