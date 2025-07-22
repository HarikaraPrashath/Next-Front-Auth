"use client";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();
 

  const login = async (name: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify({
          name,
          password,
        }),
      });

      const json = await response.json();
      console.log("Login response:", json); //help for debugging

      if (!response.ok) {
        setError(json.message);
        setIsLoading(false);
        return { success: false, error: json.message };
      }
      // Save user to local storage
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload:json}); // give return
      setIsLoading(false);
     
      return { success: true };
    } catch {
      setError("Something went wrong.");
      setIsLoading(false);
      return { success: false };
    }
  };
  return { login, error, isLoading };
};
