import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddExpense = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Food");
  const [category, setCategory] = useState("income");
  const [note, setNote] = useState("");

  const handleAddExpense = () => {
    const newExpense = {
      title,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toISOString().split("T")[0],
      note,
    };

    axios
      .post(`${process.env.EXPO_PUBLIC_API_URL}/expenses`, newExpense)
      .then((response) => {
        Alert.alert("Success", "Expense added successfully!");
        router.push("/");
      })
      .catch((error) => {
        Alert.alert("Error", "Failed to add expense.");
        console.error("Error adding expense:", error);
      });
    setTitle("");
    setAmount("");
    setType("Food");
    setCategory("income");
    setNote("");
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#0F172A" }}
      className="px-6 py-8"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={60}
        className="flex-1 justify-between"
      >
        <ScrollView
          className="flex-1"
          //   contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-3xl font-bold text-white mb-8">
            Add Expense
          </Text>
          <View className="mb-5">
            <Text className="text-white text-sm font-semibold mb-2">Title</Text>
            <TextInput
              className="bg-white/10 border border-white/20 p-4 rounded-lg text-white"
              placeholder="Enter title"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
          </View>

          <View className="mb-5">
            <Text className="text-white text-sm font-semibold mb-2">
              Amount
            </Text>
            <TextInput
              className="bg-white/10 border border-white/20 p-4 rounded-lg text-white"
              placeholder="Enter amount"
              placeholderTextColor="rgba(255,255,255,0.5)"
              keyboardType="numeric"
              value={amount}
              onChangeText={(text) => setAmount(text)}
            />
          </View>

          <View className="mb-5">
            <Text className="text-white text-sm font-semibold mb-2">Type</Text>
            <View className="bg-white/10 border border-white/20 rounded-lg">
              <Picker
                selectedValue={type}
                onValueChange={(itemValue) => setType(itemValue)}
                dropdownIconColor="white"
                style={{ color: "white" }}
              >
                <Picker.Item label="Food" value="Food" />
                <Picker.Item label="Job" value="Job" />
                <Picker.Item label="Tuition" value="Tuition" />
                <Picker.Item label="Utilities" value="Utilities" />
                <Picker.Item label="Freelancing" value="Freelancing" />
                <Picker.Item label="Shopping" value="Shopping" />
                <Picker.Item label="Transport" value="Transport" />
                <Picker.Item label="Entertainment" value="Entertainment" />
                <Picker.Item label="Health" value="Health" />
                <Picker.Item label="Education" value="Education" />
                <Picker.Item label="Others" value="Others" />
              </Picker>
            </View>
          </View>

          <View className="mb-5">
            <Text className="text-white text-sm font-semibold mb-2">
              Category
            </Text>
            <View className="bg-white/10 border border-white/20 rounded-lg">
              <Picker
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
                dropdownIconColor="white"
                style={{ color: "white" }}
              >
                <Picker.Item label="Income" value="income" />
                <Picker.Item label="Expense" value="expense" />
              </Picker>
            </View>
          </View>

          <View className="mb-8">
            <Text className="text-white text-sm font-semibold mb-2">Note</Text>
            <TextInput
              className="bg-white/10 border border-white/20 p-4 rounded-lg h-28 text-white"
              placeholder="Add a short note"
              placeholderTextColor="rgba(255,255,255,0.5)"
              multiline
              value={note}
              onChangeText={(text) => setNote(text)}
            />
          </View>

          <TouchableOpacity
            onPress={handleAddExpense}
            className="bg-[#4E9D9C] py-4 rounded-2xl items-center"
          >
            <Text className="text-white font-bold text-base">Add Expense</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddExpense;
