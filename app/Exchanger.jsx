import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RNPickerSelect from "react-native-picker-select";
import { SafeAreaView } from "react-native-safe-area-context";

const Exchanger = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [allRates, setAllRates] = useState({});

  const currencies = [
    { label: "USD 🇺🇸", value: "USD" },
    { label: "EUR 🇪🇺", value: "EUR" },
    { label: "GBP 🇬🇧", value: "GBP" },
    { label: "JPY 🇯🇵", value: "JPY" },
    { label: "CNY 🇨🇳", value: "CNY" },
    { label: "BDT 🇧🇩", value: "BDT" },
    { label: "INR 🇮🇳", value: "INR" },
    { label: "PKR 🇵🇰", value: "PKR" },
    { label: "SAR 🇸🇦", value: "SAR" },
    { label: "AED 🇦🇪", value: "AED" },
    { label: "QAR 🇶🇦", value: "QAR" },
    { label: "CAD 🇨🇦", value: "CAD" },
    { label: "AUD 🇦🇺", value: "AUD" },
    { label: "CHF 🇨🇭", value: "CHF" },
  ];

  const convertCurrency = async () => {
    try {
      const res = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`,
      );
      const data = await res.json();

      const rate = data.rates[toCurrency];
      const converted = parseFloat(amount) * rate;
      const roundedConverted = Math.round(converted * 100) / 100;
      setConvertedAmount(roundedConverted);
    } catch (error) {
      Alert.alert("Error", "Failed to convert currency. Please try again.");
      console.log("Error converting currency:", error);
    }
  };

  //   const allCurrencies = async () => {
  //     const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
  //     const data = await res.json();
  //     return data.rates;
  //   };

  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((res) => res.json())
      .then((data) => setAllRates(data.rates));
  }, []);

  return (
    <SafeAreaView className="flex-1 items-center bg-gray-900">
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraScrollHeight={30}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
        showsVerticalScrollIndicator={false}
        className="w-full"
      >
        <View className="w-full flex-row items-center justify-between px-4">
          <Text className="text-white text-xl font-bold">
            Exchange your money!
          </Text>
        </View>
        <View className="w-full px-4 mt-6">
          {/* amount input */}
          <View>
            <Text className="text-white mb-2">Enter amount to exchange:</Text>
            <TextInput
              className="bg-gray-700 text-white border border-gray-500 rounded-md py-4 px-2"
              placeholder="Enter amount"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
          </View>

          <View className="mt-4 bg-gray-800 rounded-md">
            <Text className="text-white mt-4 px-2">From currency:</Text>
            <RNPickerSelect
              items={currencies}
              className="bg-gray-700 text-white border border-white rounded-md py-4 px-2"
              onValueChange={setFromCurrency}
            ></RNPickerSelect>
          </View>

          <View className="mt-4 bg-gray-800 rounded-md">
            <Text className="text-white mt-4 px-2">To currency:</Text>
            <RNPickerSelect
              items={currencies}
              className="bg-gray-700 text-white border border-gray-500 rounded-md py-4 px-2"
              onValueChange={setToCurrency}
            ></RNPickerSelect>
          </View>

          <TouchableOpacity
            onPress={convertCurrency}
            className="bg-blue-600 rounded-md p-3 mt-6 items-center"
          >
            <Text className="text-white font-bold">Convert</Text>
          </TouchableOpacity>

          <View>
            <Text className="text-white mt-4 px-2">Converted amount: </Text>
            <Text className="text-green-400 text-lg font-bold mt-2 px-2">
              {amount} {fromCurrency} = {convertedAmount.toFixed(2)}{" "}
              {toCurrency}
            </Text>
          </View>

          <FlatList
            data={
              allRates
                ? Object.entries(allRates).map(([key, value]) => ({
                    label: key,
                    value,
                  }))
                : []
            }
            keyExtractor={(item) => item.label}
            renderItem={({ item }) => (
              <View className="bg-gray-800 mx-4 my-2 p-3 rounded-lg flex-row justify-between">
                <Text className="text-white font-semibold">{item.label}</Text>
                <Text className="text-green-400">{item.value}</Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Exchanger;
