import React, { useState } from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignupPage = () => {
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ name: "", username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Enter a valid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAdding) return;
    setIsAdding(true);

    try {
      await schema.validate(data, { abortEarly: false });
      setErrors({});

      const res = await axios.post(
        `${process.env.REACT_APP_Backend_URL}/register`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("User registered successfully! ✅", { position: "bottom-right" });
      setData({ name: "", username: "", email: "", password: "" });
      navigate("/login");

    } catch (err) {
      if (err.inner) {
        const validationErrors = {};
        err.inner.forEach((e) => {
          validationErrors[e.path] = e.message;
        });
        setErrors(validationErrors);
      } else {
        toast.error(
          err.response?.data?.msg === "User Already Registered"
            ? "User is already registered!"
            : err.response?.data?.msg || "Registration Failed",
          { position: "bottom-right" }
        );
      }
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="flex justify-center items-center px-4 animate-on-scroll">
      <div className="bg-white shadow rounded-lg p-6 max-w-md w-full mt-16">
        <div className="flex justify-center mb-4">
          <p className="text-3xl font-bold text-gray-800">
            Jad<span className="text-orange-500 border-2 border-orange-500 rounded px-1">oo</span>
          </p>
        </div>
         <p className="font-bold text-gray-400 flex justify-center mt-3">
          ✨Sign up to explore locations capture memories✨
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-3 mt-4">
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className={`border p-2 rounded-md w-full focus:ring-2 focus:ring-[#fdbd33] outline-none ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}

          <input
            type="text"
            name="username"
            value={data.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className={`border p-2 rounded-md w-full focus:ring-2 focus:ring-[#fdbd33] outline-none ${errors.username ? "border-red-500" : ""}`}
          />
          {errors.username && <p className="text-red-600 text-sm">{errors.username}</p>}

          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`border p-2 rounded-md w-full focus:ring-2 focus:ring-[#fdbd33] outline-none ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`border p-2 rounded-md w-full pr-10 focus:ring-2 focus:ring-[#fdbd33] outline-none ${errors.password ? "border-red-500" : ""}`}
            />
            <button
              type="button"
              className="absolute  right-3 top-1/2 transform -translate-y-1/2 text-gray-600 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={isAdding}
            className="h-10 bg-[#fdbd33] text-white rounded-lg hover:bg-[#fcb000] transition duration-300 w-full mt-3"
          >
            {isAdding ? "Signing..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
