"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLogout } from "../hook/useLogout";

const RedirectHandler = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; token: string } | null>(null);
  const { logout } = useLogout();

  //Logout Method
  const handleClick = () => {
    logout();
    router.push("/Login");
  };

// Check if user is logged in by checking local storage
 useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const token = parsedUser?.token;
        const email = parsedUser?.user?.email

        if (token && email) {
          setUser({ email, token });
        } else {
          router.push("/Login");
        }
      } catch (error) {
        console.error("Invalid user format in localStorage");
        router.push("/Login");
      }
    } else {
      router.push("/");
    }
  }, [router]);


  if (!user) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-white  rounded-lg p-4 w-[90%] max-w-md text-center">
        <h1 className="text-2xl font-semibold text-blue-600 mb-4">Home Page</h1>

        <div className="mb-4">
          <p className="text-gray-700 font-medium mb-1">Email</p>
          <p className="text-sm text-gray-500 bg-gray-100 p-2 rounded-md break-all">
            {user.email}
          </p>
        </div>

        <div>
          <p className="text-gray-700 font-medium mb-1">Token</p>
          <p className="text-xs text-gray-500 bg-gray-100 p-2 rounded-md break-all">
            {user.token}
          </p>
        </div>

        <div className="mt-6">
          <span className="text-sm text-gray-400">
            You can see the token and email here...
          </span>
        </div>
        <button
          type="submit"
          onClick={handleClick}
          className="px-6 py-2 bg-blue-500 mt-5 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default RedirectHandler;