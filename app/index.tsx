import Feather from "@expo/vector-icons/Feather";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Expenses from "./components/Expenses";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Index() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios
      // .get("https://expense-tracker-app-server-l1bm.onrender.com/expenses")
      .get("http://192.168.10.70:3000/expenses")
      .then((res) => {
        console.log("API RESPONSE:", res.data);
        setExpenses(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const totalIncome = expenses
    .filter((exp: any) => exp.category === "income")
    .reduce((sum, exp: any) => sum + exp.amount, 0);

  const totalExpense = expenses
    .filter((exp: any) => exp.category === "expense")
    .reduce((sum, exp: any) => sum + exp.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-[#0F172A] to-[#1E293B] relative">
      <View className="px-6 pt-8 pb-4">
        <Text className="text-3xl font-bold text-white mb-2">Wallet</Text>

        <View className="bg-gradient-to-br from-[#4E9D9C] to-[#2D7472] rounded-3xl p-6 mb-2 shadow-lg">
          <Text className="text-white text-sm font-medium opacity-80 mb-2">
            Total Balance
          </Text>
          <Text className="text-4xl font-bold text-white mb-6">
            ৳ {balance.toLocaleString()}
          </Text>

          <View className="flex-row justify-between">
            <View>
              <View className="flex-row items-center mb-2">
                <View className="w-3 h-3 rounded-full bg-green-300 mr-2" />
                <Text className="text-white text-xs opacity-80">Income</Text>
              </View>
              <Text className="text-white text-lg font-semibold">
                +৳ {totalIncome.toLocaleString()}
              </Text>
            </View>
            <View>
              <View className="flex-row items-center mb-2">
                <View className="w-3 h-3 rounded-full bg-red-300 mr-2" />
                <Text className="text-white text-xs opacity-80">Expenses</Text>
              </View>
              <Text className="text-white text-lg font-semibold">
                -৳ {totalExpense.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        <View className="">
          <Text className="text-white text-lg font-bold">
            Recent Transactions
          </Text>
        </View>
      </View>

      <View className="flex-1 mb-10">
        <Expenses />
      </View>

      <TouchableOpacity
        onPress={() => router.push("/components/AddExpense")}
        className="absolute bottom-20 right-6 w-16 h-16 rounded-full bg-green-600 items-center justify-center shadow-lg active:opacity-80"
      >
        <Feather name="plus" size={28} color="white" strokeWidth={3} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
