import { Stack } from "expo-router";
import "../global.css";
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <Stack>
      <StatusBar style="auto" hidden={false}  />
      <Stack.Screen
        name="index"
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
    </Stack>
  );
}
