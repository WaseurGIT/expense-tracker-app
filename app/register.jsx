import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleRegister = () => {
    if (
      fullName &&
      email &&
      password &&
      confirmPassword &&
      password === confirmPassword
    ) {
      router.push("/index");
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <StatusBar barStyle="light-content" backgroundColor="#065f46" />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraScrollHeight={30}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        className="bg-gradient-to-b from-emerald-700 to-emerald-600"
      >
        <View className="flex-1 justify-center px-6 py-12">
          <View className="items-center mb-10 mt-6">
            <View className="mb-4 bg-emerald-500 w-20 h-20 rounded-full items-center justify-center shadow-lg">
              <MaterialCommunityIcons
                name="wallet-plus"
                size={40}
                color="#ffffff"
              />
            </View>
            <Text className="text-4xl font-bold text-white mb-2">
              Create Account
            </Text>
            <Text className="text-emerald-100 text-lg font-light">
              Join WalletTrack Today
            </Text>
          </View>

          <View className="space-y-2">
            <View className="mb-2">
              <Text className="text-white text-sm font-semibold mb-3">
                Full Name
              </Text>
              <View className="flex-row items-center bg-white bg-opacity-10 rounded-xl px-4 py-3 border border-emerald-400 border-opacity-30">
                <MaterialCommunityIcons
                  name="account-outline"
                  size={20}
                  color="black"
                />
                <TextInput
                  className="flex-1 ml-3 text-base"
                  placeholder="Your Full Name"
                  placeholderTextColor="black"
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                />
              </View>
            </View>

            <View className="mb-2">
              <Text className="text-white text-sm font-semibold mb-3">
                Email Address
              </Text>
              <View className="flex-row items-center bg-white bg-opacity-10 rounded-xl px-4 py-3 border border-emerald-400 border-opacity-30">
                <MaterialCommunityIcons
                  name="email-outline"
                  size={20}
                  color="black"
                />
                <TextInput
                  className="flex-1 ml-3 text-base"
                  placeholder="you@example.com"
                  placeholderTextColor="black"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View className="mb-2">
              <Text className="text-white text-sm font-semibold mb-3">
                Password
              </Text>
              <View className="flex-row items-center bg-white bg-opacity-10 rounded-xl px-4 py-3 border border-emerald-400 border-opacity-30">
                <MaterialCommunityIcons
                  name="lock-outline"
                  size={20}
                  color="black"
                />
                <TextInput
                  className="flex-1 ml-3 text-base"
                  placeholder="Create a strong password"
                  placeholderTextColor="black"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <MaterialCommunityIcons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View className="mb-6">
              <Text className="text-white text-sm font-semibold mb-3">
                Confirm Password
              </Text>
              <View className="flex-row items-center bg-white bg-opacity-10 rounded-xl px-4 py-3 border border-emerald-400 border-opacity-30">
                <MaterialCommunityIcons
                  name="lock-check-outline"
                  size={20}
                  color="black"
                />
                <TextInput
                  className="flex-1 ml-3 text-base"
                  placeholder="Confirm your password"
                  placeholderTextColor="black"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <MaterialCommunityIcons
                    name={
                      showConfirmPassword ? "eye-outline" : "eye-off-outline"
                    }
                    size={20}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleRegister}
              className="bg-white bg-opacity-90 py-4 rounded-xl shadow-lg active:bg-opacity-100"
            >
              <Text className="text-emerald-700 text-lg font-bold text-center">
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row items-center justify-center py-6 px-6">
          <Text className="text-emerald-100 text-sm">
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text className="text-white text-sm font-bold underline">
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Register;
