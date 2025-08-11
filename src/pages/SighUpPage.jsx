import React, { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useScrollAnimation from "../useScrollAnimation";
import SplashCursor from "../components/nurui/splash-cursor";

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const SignupPage = () => {
  useScrollAnimation();

  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAdding) return;

    setIsAdding(true);
    console.log("Form submitted with:", data);

    try {
      const response = await fetch(`${process.env.REACT_APP_Backend_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (response.ok) {
        setData({ name: "", username: "", email: "", password: "" });
        toast.success("User registered successfully! ✅", { position: "bottom-right" });
        navigate("/login");
      } else {
        if (result.msg === "User Already Registered") {
          toast.error("User is already registered!", { position: "bottom-right" });
        } else {
          throw new Error(result.msg || "Registration Failed");
        }
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error(error.message || "Something went wrong!", { position: "bottom-right" });
    } finally {
      setIsAdding(false);
    }
  };

  const debouncedHandleSubmit = useCallback(debounce(handleSubmit, 2000), [data]);

  return (
    <>
      <div className="flex justify-center items-center px-4 animate-on-scroll">
        <div className="bg-white shadow rounded-lg p-6 max-w-md w-full mt-16">
          <div className="flex justify-center">
            <p className="text-3xl font-bold text-gray-800">
              Jad
              <span className="text-orange-500 border-2 border-orange-500 rounded px-1">oo</span>
            </p>
          </div>

          <p className="font-bold text-gray-400 flex justify-center mt-3">
            ✨ Sign up to explore locations
          </p>
          <p className="font-bold text-gray-400 flex justify-center ml-9"> & capture memories ✨</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              debouncedHandleSubmit(e);
            }}
            className="flex flex-col space-y-3 mt-4"
          >
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="border p-2 rounded-md w-full focus:ring-2 focus:ring-[#fdbd33] outline-none"
              required
            />

            <input
              type="text"
              name="username"
              value={data.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="border p-2 rounded-md w-full focus:ring-2 focus:ring-[#fdbd33] outline-none"
              required
            />

            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="border p-2 rounded-md w-full focus:ring-2 focus:ring-[#fdbd33] outline-none"
              required
            />

            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="border p-2 rounded-md w-full pr-10 focus:ring-2 focus:ring-[#fdbd33] outline-none"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <button
              type="submit"
              disabled={isAdding}
              className="h-10 bg-[#fdbd33] text-white rounded-lg hover:bg-[#fcb000] transition duration-300 w-full mt-3"
            >
              {isAdding ? "Sign..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>

      <div className="flex justify-center px-4 mt-5 animate-on-scroll">
        <div className="bg-white p-6 rounded-lg shadow text-center max-w-md w-full mb-10">
          <p className="text-gray-600">Have an account?</p>
          <p className="text-blue-500 hover:underline">
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
      <SplashCursor/>
    </>
  );
};

export default SignupPage;
