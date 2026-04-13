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

      if (token) {
        setUser({ token });
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (userData) => {
    try {
      const res = await axiosSecure.post("/login", userData);
      const token = res.data.token;
      await AsyncStorage.setItem("token", token);
      setUser({ email: userData.email });
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
  };

  const authInfo = {
    user,
    loading,
    setUser,
    setLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
