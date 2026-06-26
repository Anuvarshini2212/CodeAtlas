import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaRobot,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } =
        await API.post(
          "/auth/login",
          formData
        );

      login(data);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };
 return (
  <div className="min-h-screen bg-slate-950 relative overflow-hidden">

    {/* Background Glow */}

    <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />

    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-700/20 rounded-full blur-[150px]" />

    <div className="grid lg:grid-cols-2 min-h-screen">

      {/* LEFT SIDE */}

      <div className="hidden lg:flex flex-col justify-center pl-36 pr-12 relative">

        <div className="flex items-center gap-4 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-xl">

            <FaRobot className="text-3xl text-white" />

          </div>

          <div>

            <h1 className="text-5xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">

              CodeAtlas

            </h1>

            <p className="text-slate-400">

              AI Repository Intelligence Platform

            </p>

          </div>

        </div>

        <span className="inline-flex w-fit bg-blue-500/20 border border-blue-400/30 px-4 py-2 rounded-full text-blue-300 mb-8">

          🚀 AI Powered

        </span>

        <h2 className="text-6xl font-black leading-tight text-white">

          Understand

          <br />

          Any

          <span className="text-blue-400">

            {" "}Repository

          </span>

          <br />

          In Seconds.

        </h2>

        <div className="space-y-5 mt-12">

          <div className="flex items-center gap-3">

            <FaCheckCircle className="text-green-400" />

            AI File Summaries

          </div>

          <div className="flex items-center gap-3">

            <FaCheckCircle className="text-green-400" />

            Repository Chat

          </div>

          <div className="flex items-center gap-3">

            <FaCheckCircle className="text-green-400" />

            Architecture Analysis

          </div>

          <div className="flex items-center gap-3">

            <FaCheckCircle className="text-green-400" />

            Repository Search

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="flex justify-center items-center p-8">

        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-10">

          <h2 className="text-4xl font-bold text-center text-white">

            Welcome Back 

          </h2>

          <p className="text-center text-slate-400 mt-3 mb-10">

            Sign in to continue to CodeAtlas

          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* EMAIL */}

            <div className="relative">

              <FaEnvelope className="absolute left-4 top-5 text-slate-500" />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-blue-500 transition"
              />

            </div>

            {/* PASSWORD */}

            <div className="relative">

              <FaLock className="absolute left-4 top-5 text-slate-500" />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-4 pl-12 pr-12 outline-none focus:border-blue-500 transition"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-5 text-slate-400 hover:text-white"
              >

                {showPassword
                  ? <FaEyeSlash />
                  : <FaEye />}

              </button>

            </div>
                        {/* LOGIN BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] shadow-xl disabled:opacity-60"
            >
              {loading ? (
                "Signing In..."
              ) : (
                <>
                  Login
                  <FaArrowRight />
                </>
              )}
            </button>

          </form>

          {/* Divider */}

          <div className="flex items-center gap-3 my-8">

            <div className="flex-1 h-px bg-slate-700"></div>

            <span className="text-slate-500 text-sm">
              OR
            </span>

            <div className="flex-1 h-px bg-slate-700"></div>

          </div>

          {/* Register */}

          <p className="text-center text-slate-400">

            Don't have an account?

            <Link
              to="/register"
              className="ml-2 text-blue-400 hover:text-blue-300 font-semibold"
            >
              Create Account
            </Link>

          </p>

          

        </div>

      </div>

    </div>

  </div>
);

};

export default Login;