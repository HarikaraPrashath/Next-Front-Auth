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
      } catch {
        router.push("/Login");
      }
    } else {
      router.push("/");
    }
  }, [router]);


  if (!user) return null;

  return (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 px-4">
  <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-lg text-center">
    <h1 className="text-3xl font-bold text-blue-700 mb-6">Welcome Back!</h1>

    <div className="mb-6">
      <p className="text-gray-700 font-semibold mb-2">Email</p>
      <p className="text-gray-600 bg-gray-100 p-3 rounded-lg truncate" title={user.email}>
        {user.email}
      </p>
    </div>

    <p className="text-sm text-gray-400 italic mb-8">
      You are logged in. Enjoy your session!
    </p>

    <button
      type="button"
      onClick={handleClick}
      className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
    >
      Logout
    </button>
  </div>
</div>

  );
};

export default RedirectHandler;