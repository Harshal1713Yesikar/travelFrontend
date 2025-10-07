import React, { useState } from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import axios from "axios";

const Contact = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const schema = Yup.object().shape({
    name: Yup.string().required("Please enter your name"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    message: Yup.string().required("Please write a message"),
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(data, { abortEarly: false });
      setErrors({}); 

      const res = await axios.post(
        `${process.env.REACT_APP_Backend_URL}/contactUs`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("Message Sent Successfully", { position: "bottom-right" });
      setData({ name: "", email: "", message: "" });
    } catch (err) {
      if (err.inner) {
        const formErrors = {};
        err.inner.forEach((e) => {
          formErrors[e.path] = e.message;
        });
        setErrors(formErrors);
      } else {
        toast.error(err.response?.data?.message || "Something went wrong!", {
          position: "bottom-right",
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl w-full animate-on-scroll">
        <h2 className="text-2xl md:text-4xl font-bold font-inika text-center mb-2">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Have a question? Send us a message and we'll get back to you!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Your Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              className={`w-full border rounded-md p-2 focus:ring-2 focus:ring-[#fdbd33] outline-none ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Your Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className={`w-full border rounded-md p-2 focus:ring-2 focus:ring-[#fdbd33] outline-none ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Your Message</label>
            <textarea
              name="message"
              value={data.message}
              onChange={handleChange}
              className={`w-full border rounded-md p-2 h-32 resize-none focus:ring-2 focus:ring-[#fdbd33] outline-none ${
                errors.message ? "border-red-500" : ""
              }`}
              placeholder="Write your message..."
            />
            {errors.message && <p className="text-red-600 text-sm">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-[#fdbd33] text-white rounded-lg hover:bg-[#fcb000] transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
