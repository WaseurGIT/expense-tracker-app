import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../app/hooks/useAuth";
import axiosSecure from "./axiosSecure";
import Expenses from "./components/Expenses";

export default function Index() {
  const { user, logout } = useAuth();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (!user) return;

    axiosSecure
      .get("/expenses")
      .then((res) => setExpenses(res.data))
      .catch((err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          router.push("/login");
        }
        console.log(err);
      });
  }, [user]);

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

        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text className="text-sm text-emerald-400 font-medium mb-4">
            Login
          </Text>
        </TouchableOpacity>

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
        <Expenses expenses={expenses} />
      </View>

      <TouchableOpacity
        // onPress={() => router.push("/components/AddExpense")}
        onPress={() => {
          user ? router.push("/components/AddExpense") : router.push("/login");
        }}
        className="absolute bottom-20 right-6 w-16 h-16 rounded-full bg-green-600 items-center justify-center shadow-lg active:opacity-80"
      >
        <Feather name="plus" size={28} color="white" strokeWidth={3} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
