import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Fuel, Coins } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function MetricsDashboard() {
  const { data: metrics } = useQuery({
    queryKey: ['/api/metrics'],
    queryFn: async () => {
      const response = await fetch('/api/metrics');
      if (!response.ok) throw new Error('Failed to fetch metrics');
      return response.json();
    },
  });

  const metricCards = [
    {
      icon: TrendingUp,
      value: metrics?.dailyVolume || "$7.26B",
      label: "24h Volume",
      change: "+15.2%",
      color: "from-green-400 to-green-600",
      changeColor: "text-green-500"
    },
    {
      icon: Users,
      value: metrics?.activeUsers || "425K",
      label: "Active Users",
      change: "+8.7%",
      color: "from-blue-400 to-blue-600",
      changeColor: "text-blue-500"
    },
    {
      icon: Fuel,
      value: metrics?.gasSaved || "$42M",
      label: "Gas Saved",
      change: "-23.1%",
      color: "from-purple-400 to-purple-600",
      changeColor: "text-purple-500"
    },
    {
      icon: Coins,
      value: metrics?.tokenVolume || "$16.7M",
      label: "1INCH Volume",
      change: "$0.2393",
      color: "from-orange-400 to-orange-600",
      changeColor: "text-orange-500"
    }
  ];

  const protocolData = [
    { name: "Aggregation Protocol", percentage: 68, color: "bg-inch-blue" },
    { name: "Limit Orders", percentage: 19, color: "bg-inch-purple" },
    { name: "Fusion Mode", percentage: 13, color: "bg-green-500" }
  ];

  return (
    <section id="metrics" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-inch-dark dark:text-white mb-4">Protocol Performance</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Real-time metrics showcasing 1inch protocol efficiency
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metricCards.map((metric, index) => (
            <Card key={index} className="bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-lg flex items-center justify-center`}>
                    <metric.icon className="text-white" size={20} />
                  </div>
                  <span className={`text-sm ${metric.changeColor} font-medium`}>{metric.change}</span>
                </div>
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{metric.value}</div>
                <div className="text-gray-600 dark:text-gray-400">{metric.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Volume Chart */}
          <Card className="bg-white dark:bg-gray-900 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">Trading Volume (7 Days)</h3>
              <div className="h-64 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-end justify-around p-4">
                {/* Mock Bar Chart */}
                {[32, 28, 36, 24, 40, 48, 44].map((height, index) => (
                  <div 
                    key={index}
                    className={`bg-gradient-to-t from-inch-blue to-blue-300 w-8 rounded-t transition-all duration-500 hover:opacity-80`}
                    style={{ height: `${height * 4}px` }}
                  ></div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Protocol Distribution */}
          <Card className="bg-white dark:bg-gray-900 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">Protocol Usage Distribution</h3>
              <div className="space-y-4">
                {protocolData.map((protocol, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 ${protocol.color} rounded-full`}></div>
                        <span className="text-gray-800 dark:text-gray-200">{protocol.name}</span>
                      </div>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{protocol.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`${protocol.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${protocol.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}