import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";
import AuthProvider from "./context/AuthProvider";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="auto" hidden={false} />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            contentStyle: { backgroundColor: "#0F172A" },
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
            contentStyle: { backgroundColor: "#0F172A" },
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            headerShown: false,
            contentStyle: { backgroundColor: "#0F172A" },
          }}
        />
        <Stack.Screen
          name="components/AddExpense"
          options={{
            headerShown: false,
            title: "Add Transaction",
            // headerStyle: { backgroundColor: "#0F172A" },
            // headerTitleStyle: {
            //   color: "white",
            //   fontSize: 18,
            //   fontWeight: "bold",
            // },
            // headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="/Charts"
          options={{
            headerShown: false,
            title: "Analytics",
            // headerStyle: { backgroundColor: "#0F172A" },
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
