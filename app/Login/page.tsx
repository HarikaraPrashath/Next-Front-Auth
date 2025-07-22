"use client";
import { useState } from "react";
import { useLogin } from "../hook/useLogin";
import { useRouter } from "next/navigation";
import Image from "next/image";


const Login = () => {
  const { login, error, isLoading } = useLogin();
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(name, password);
   
    if (success.error) {
      alert(success.error);
    } 
    else if (success.success) {
      alert("Login Your Account Successfully");
      router.push("/");
    }
  };
  return (
     <div
      className="min-h-screen "
      style={{ backgroundImage: "url('/images/bg.png')" }}
    >
      <div className="grid grid-cols-[30%_70%] min-h-screen b">
        {/* Left Column */}
        <div className="">
          {/* Logo */}
          <div className="flex items-center justify-center pt-10">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={150}
              height={50}
              className="w-48 h-auto"
            />
          </div>

          {/* Footer Text */}
          <div className="absolute bottom-8 left-8 text-gray-700 text-sm font-semibold">
            © 2025 MediSync. All rights reserved.
          </div>
        </div>

        {/* Right Column */}
        <div
          className="w-full h-full bg-cover bg-center "
          style={{ backgroundImage: "url('/images/hero.png')" }}
        >
          {/* Login Form */}
          <div className=" flex flex-col items-center justify-center h-full ml-50 text-white px-6">
            <h1 className="text-5xl md:text-6xl font-bold mb-2">Welcome</h1>
            <p className="text-lg mb-8">Sign in to access your EMR Dashboard</p>

            <form onSubmit={handleSubmit} className="rounded-2xl  px-8 py-6 w-full max-w-md  ">
              {/* Username */}
              <div className="mb-4">
                <label className="block mb-1 text-white">Username</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-black px-4 py-2 border bg-white border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Enter your username"
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block mb-1  text-white">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-black px-4 py-2 border bg-white border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Enter your password"
                />
              </div>

              {/* Remember Me and Forgot */}
              <div className="flex justify-between items-center mb-6 text-sm">
                <label className="flex items-center text-white">
                  <input
                    type="checkbox"
                    className="w-4 h-4 mr-2 appearance-none border-2 border-white rounded-sm bg-transparent checked:bg-white checked:border-white checked:accent-white focus:outline-none"
                  />
                  Remember me
                </label>
                <a href="/ForgotPassword" className="text-white hover:underline">
                  Forgot Password?
                </a>
              </div>

             {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-green-900 hover:bg-green-950 text-white font-semibold py-2 rounded-2xl transition ${
                  isLoading
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-green-700"
                }`}              >
               
                  {isLoading ? " Go To Dashboard..." : " Go To Dashboard"}
              </button>




              {/* Already have account */}
              <p className="text-center text-white text-sm mt-6">
                Already have not an account?{" "}
                <a href="/SignUp" className="text-green-600 hover:underline">
                  Signup
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
