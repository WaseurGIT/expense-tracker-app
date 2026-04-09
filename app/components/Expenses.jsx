import React from "react";
import { FlatList, Text, View } from "react-native";
import expenses from "../data/expenses.json";

const getCategoryIcon = (type) => {
  const icons = {
    Food: "🍔",
    Job: "💼",
    Utilities: "⚡",
    Freelancing: "💻",
    Shopping: "🛍️",
    Transport: "🚗",
    Entertainment: "🎬",
    Health: "🏥",
    Education: "📚",
    Other: "📌",
  };
  return icons[type] || "📌";
};

const getCategoryColor = (type) => {
  const colors = {
    Food: "bg-orange-100",
    Job: "bg-blue-100",
    Utilities: "bg-yellow-100",
    Freelancing: "bg-purple-100",
    Shopping: "bg-pink-100",
    Transport: "bg-green-100",
    Entertainment: "bg-indigo-100",
    Health: "bg-red-100",
    Education: "bg-cyan-100",
    Other: "bg-gray-100",
  };
  return colors[type] || "bg-gray-100";
};

const Expenses = () => {
  return (
    <View className="flex-1 px-6">
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View className="bg-white rounded-2xl p-4 mb-3 flex-row items-center justify-between shadow-sm border-l-4 border-[#4E9D9C]">
            <View className="flex-row items-center flex-1">
              <View
                className={`${getCategoryColor(item.type)} rounded-full w-12 h-12 items-center justify-center mr-4`}
              >
                <Text className="text-xl">{getCategoryIcon(item.type)}</Text>
              </View>

              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900 mb-1">
                  {item.title}
                </Text>
                <View className="flex-row items-center">
                  <View className="bg-gray-100 rounded-full px-2 py-1 mr-2">
                    <Text className="text-xs text-gray-600 font-medium">
                      {item.type}
                    </Text>
                  </View>
                  <Text className="text-xs text-gray-500">{item.date}</Text>
                </View>
              </View>
            </View>

            <View className="items-end ml-3">
              <Text
                className={`text-lg font-bold ${
                  item.category === "income" ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.category === "income" ? "+" : "-"}৳
                {item.amount.toLocaleString()}
              </Text>
              <Text
                className={`text-xs mt-1 font-semibold ${
                  item.category === "income" ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.category.toUpperCase()}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Expenses;
