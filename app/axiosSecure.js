import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const axiosSecure = axios.create({
//   baseURL: "https://expense-tracker-app-server-l1bm.onrender.com",
  baseURL: "https://192.168.10.70:3000",
});

axiosSecure.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosSecure;
