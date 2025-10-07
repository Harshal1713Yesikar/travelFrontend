import React, { useState } from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const schema = Yup.object().shape({
    email: Yup.string().email("Enter a valid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error when typing
  };

  const handleLogin = async () => {
    if (isAdding) return;
    setIsAdding(true);

    try {
      await schema.validate(data, { abortEarly: false });
      setErrors({}); // clear previous errors

      const res = await axios.post(
        `${process.env.REACT_APP_Backend_URL}/login`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("User Logged In Successfully", { position: "bottom-right" });
      localStorage.setItem("token", res.data.token);
      setData({ email: "", password: "" });
      navigate("/");

    } catch (err) {
      if (err.inner) {
        // Yup validation errors
        const validationErrors = {};
        err.inner.forEach((e) => {
          validationErrors[e.path] = e.message;
        });
        setErrors(validationErrors);
      } else {
        toast.error(err.response?.data?.msg || "Login Failed", { position: "bottom-right" });
      }
    } finally {
      setIsAdding(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="flex justify-center items-center mt-32">
      <div className="p-8 rounded-lg shadow max-w-md w-full">
        <div className="flex justify-center mb-4">
          <p className="text-3xl font-bold text-gray-800">
            Jad<span className="text-orange-500 border-2 border-orange-500 rounded px-1">oo</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={data.email}
              onChange={handleChange}
              className={`border p-2 rounded-md w-full focus:ring-2 focus:ring-[#fdbd33] outline-none ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={data.password}
                onChange={handleChange}
                className={`border p-2 rounded-md w-full pr-10 focus:ring-2 focus:ring-[#fdbd33] outline-none ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-600 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={isAdding}
            className="mt-4 px-6 py-3 bg-[#fdbd33] text-white rounded-lg hover:bg-[#fcb000] transition duration-300 w-full"
          >
            {isAdding ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/sighup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
