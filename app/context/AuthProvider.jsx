import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import axiosSecure from "../axiosSecure";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const token = await AsyncStorage.getItem("token");
      const user = await AsyncStorage.getItem("user");

      if (token) {
        setUser({ ...user, token });
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (userData) => {
    try {
      // console.log("Attempting login with:", userData);
      const res = await axiosSecure.post("/login", userData);
      console.log("Login response:", res.data.user);

      const token = res.data.token;
      await AsyncStorage.setItem("token", token);
      const loggedin_user = {
        name: res.data.user.name,
        email: res.data.user.email,
      };
      console.log("Logged in user:", loggedin_user);
      await AsyncStorage.setItem("user", JSON.stringify(loggedin_user));
      setUser({ ...loggedin_user, token });
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
  };

  const authInfo = {
    user,
    loading,
    // setUser,
    // setLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
