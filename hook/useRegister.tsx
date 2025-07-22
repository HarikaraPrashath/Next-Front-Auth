"use client";

import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { User } from "../Context/AuthContext";

export const useRegister = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const register = async (
    name: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);
    setError(null);

    if (!name || !email || !password) {
      setIsLoading(false);
      setError("All fields are required");
      return false;
    }
console.log("Backend URL:", process.env.NEXT_PUBLIC_BACKEND_URL);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies in the request
        // This is important if your server uses cookies for session management
        body: JSON.stringify({
          name,
          email,
          password, 
        }),
      });
      const json: User & { error?: string } = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error || "Registration failed");
        return false
      }

      // Save user to local storage
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json }); 
      setIsLoading(false);
      return true
    } catch(error) {
      setError("Something went wrong");
      setIsLoading(false);
      console.error("Registration error:", error);
    }
  };
  return { register, isLoading, error };
};


