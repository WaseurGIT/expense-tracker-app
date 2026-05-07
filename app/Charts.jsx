import { useEffect, useState } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";

import axiosSecure from "./axiosSecure";

const Charts = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axiosSecure.get("/expenses");
      setExpenses(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching expenses:", error);
      setLoading(false);
    }
  };

  // Calculate income and expense totals
  const totalIncome = expenses
    .filter((exp) => exp.category === "income")
    .reduce((sum, exp) => sum + exp.amount, 0);

  const totalExpense = expenses
    .filter((exp) => exp.category === "expense")
    .reduce((sum, exp) => sum + exp.amount, 0);

  // Prepare pie chart data
  const pieChartData = [
    {
      name: "Income",
      amount: totalIncome,
      color: "#10B981",
      legendFontColor: "#7F8487",
      legendFontSize: 12,
    },
    {
      name: "Expenses",
      amount: totalExpense,
      color: "#EF4444",
      legendFontColor: "#7F8487",
      legendFontSize: 12,
    },
  ];

  // Prepare line chart data - group by date
  const getLineChartData = () => {
    const dataByDate = {};

    expenses.forEach((exp) => {
      const date = new Date(exp.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      if (!dataByDate[date]) {
        dataByDate[date] = { income: 0, expense: 0 };
      }

      if (exp.category === "income") {
        dataByDate[date].income += exp.amount;
      } else {
        dataByDate[date].expense += exp.amount;
      }
    });

    const sortedDates = Object.keys(dataByDate).sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA - dateB;
    });

    // Get last 7 entries for better visibility
    const recentDates = sortedDates.slice(-7);

    return {
      labels: recentDates,
      datasets: [
        {
          data: recentDates.map((date) => dataByDate[date].income),
          color: () => "#10B981",
          strokeWidth: 2,
        },
        {
          data: recentDates.map((date) => dataByDate[date].expense),
          color: () => "#EF4444",
          strokeWidth: 2,
        },
      ],
      legend: ["Income", "Expenses"],
    };
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
        <Text className="text-lg">Loading charts...</Text>
      </SafeAreaView>
    );
  }

  const lineChartData = getLineChartData();

  return (
    <SafeAreaView className="flex-1 bg-[#0F172A]">
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
        <Text className="text-3xl font-bold mb-6 text-white">Analytics</Text>

        {/* Summary Section */}
        <View className="mb-6 space-y-2">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Total Income:</Text>
            <Text className="text-green-400 font-bold text-lg">
              ৳ {totalIncome.toLocaleString()}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Total Expenses:</Text>
            <Text className="text-red-400 font-bold text-lg">
              ৳ {totalExpense.toLocaleString()}
            </Text>
          </View>
          <View className="flex-row justify-between border-t border-gray-600 pt-2 mt-2">
            <Text className="text-gray-400">Balance:</Text>
            <Text
              className={`font-bold text-lg ${
                totalIncome - totalExpense >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              ৳ {(totalIncome - totalExpense).toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Pie Chart */}
        <View className="mb-8 items-center bg-[#1E293B] rounded-2xl p-4">
          <Text className="text-white text-xl font-bold mb-4">
            Income vs Expenses
          </Text>
          {totalIncome > 0 || totalExpense > 0 ? (
            <PieChart
              data={pieChartData}
              width={screenWidth - 32}
              height={220}
              chartConfig={{
                backgroundColor: "#1E293B",
                backgroundGradientFrom: "#1E293B",
                backgroundGradientTo: "#1E293B",
                color: () => "#fff",
                strokeWidth: 2,
                barPercentage: 0.5,
              }}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          ) : (
            <Text className="text-gray-400 py-8">No data available</Text>
          )}
        </View>

        {/* Line Chart */}
        <View className="mb-8 items-center bg-[#1E293B] rounded-2xl p-4">
          <Text className="text-white text-xl font-bold mb-4">
            Income & Expenses Trend (Last 7 Days)
          </Text>
          {lineChartData.labels.length > 0 ? (
            <LineChart
              data={lineChartData}
              width={screenWidth - 32}
              height={220}
              chartConfig={{
                backgroundColor: "#1E293B",
                backgroundGradientFrom: "#1E293B",
                backgroundGradientTo: "#1E293B",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#fff",
                },
              }}
              bezier
              style={{
                borderRadius: 16,
              }}
            />
          ) : (
            <Text className="text-gray-400 py-8">No data available</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Charts;
