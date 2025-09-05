import React, { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useScrollAnimation from "../useScrollAnimation";
import SplashCursor from "../components/nurui/splash-cursor";
import axios from "axios";


const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const Login = () => {
  useScrollAnimation();

  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (isAdding) return;
    setIsAdding(true);
    console.log("Form submitted with:", data);


    try {
      const res = await axios.post(
        `${process.env.REACT_APP_Backend_URL}/login`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("API Response:", res.data);

      setData({ email: "", password: "" });
      toast.success("User Logged In Successfully", { position: "bottom-right" });

      localStorage.setItem("token", res.data.token);
      navigate("/");

    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(
        error.response?.data?.msg || "Login Failed",
        { position: "bottom-right" }
      );
    } finally {
      setIsAdding(false);
    }

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <>
      <div className="flex justify-center  items-center mt-32 animate-on-scroll">
        <div className="p-8 rounded-lg shadow max-w-md w-full">
          <div className="flex justify-center">
            <p className="text-3xl font-bold text-gray-800">
              Jad
              <span className="text-orange-500 border-2 border-orange-500 rounded px-1">oo</span>
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={data.email}
                onChange={handleChange}
                className="border p-2 rounded-md w-full focus:ring-2 focus:ring-[#fdbd33] outline-none"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={data.password}
                  onChange={handleChange}
                  className="border p-2 rounded-md w-full pr-10 focus:ring-2 focus:ring-[#fdbd33] outline-none"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-600 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isAdding}
              className="mt-6 px-6 py-3 bg-[#fdbd33] text-white rounded-lg hover:bg-[#fcb000] transition duration-300 w-full"
            >
              {isAdding ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>

      <div className="flex justify-center items-center animate-on-scroll">
        <div className="bg-white p-6 rounded-lg shadow text-center max-w-md w-full mb-10 mt-4">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/sighup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      {/* <SplashCursor/> */}
    </>
  );
};

export default Login;

