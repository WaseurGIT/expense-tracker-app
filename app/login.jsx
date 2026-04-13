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
import { useAuth } from "./hooks/useAuth";

const Login = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    const userData = {
      email,
      password,
    };

    login(userData);
    router.push("/");
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
          <View className="items-center mb-12 mt-8">
            <View className="mb-4 bg-emerald-500 w-20 h-20 rounded-full items-center justify-center shadow-lg">
              <MaterialCommunityIcons
                name="wallet-plus"
                size={40}
                color="#ffffff"
              />
            </View>
            <Text className="text-4xl font-bold text-white mb-2">
              WalletTrack
            </Text>
            <Text className="text-emerald-100 text-lg font-light">
              Smart Expense Management
            </Text>
          </View>

          <View className="space-y-2">
            <View className="mb-2">
              <Text className="text-white text-sm font-semibold mb-2">
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

            <View className="mb-4">
              <Text className="text-white text-sm font-semibold mb-2">
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
                  placeholder="Enter your password"
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

            {/* <TouchableOpacity className="mb-6">
                <Text className="text-emerald-100 text-sm font-medium text-right">
                  Forgot Password?
                </Text>
              </TouchableOpacity> */}

            <TouchableOpacity
              onPress={handleLogin}
              className="bg-white bg-opacity-90 py-4 rounded-xl shadow-lg active:bg-opacity-100"
            >
              <Text className="text-emerald-700 text-lg font-bold text-center">
                Sign In
              </Text>
            </TouchableOpacity>

            {/* <View className="flex-row items-center my-2">
                <View className="flex-1 h-px bg-white bg-opacity-20" />
                <Text className="mx-3 text-white text-opacity-70 text-sm">
                  or
                </Text>
                <View className="flex-1 h-px bg-white bg-opacity-20" />
              </View> */}

            {/* Social Login */}
            {/* <View className="flex-row space-x-3 justify-center">
                <TouchableOpacity className="bg-white bg-opacity-10 w-14 h-14 rounded-full items-center justify-center border border-white border-opacity-20">
                  <MaterialCommunityIcons
                    name="google"
                    size={24}
                    color="#ffffff"
                  />
                </TouchableOpacity>
                <TouchableOpacity className="bg-white bg-opacity-10 w-14 h-14 rounded-full items-center justify-center border border-white border-opacity-20">
                  <MaterialCommunityIcons
                    name="apple"
                    size={24}
                    color="#ffffff"
                  />
                </TouchableOpacity>
              </View> */}
          </View>
        </View>

        <View className="flex-row items-center justify-center py-6 px-6">
          <Text className="text-emerald-100 text-sm">
            Don&apos;t have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("/register")}>
            <Text className="text-white text-sm font-bold underline">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Login;
