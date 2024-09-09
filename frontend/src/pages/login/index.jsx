import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../components/nav-bar";
import { useNavigate } from "react-router-dom";
import useGetUserInfo from "@/hook/useGetUserInfo";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("authToken", token);
      const { role } = useGetUserInfo();
      {
        role === "SELLER" ? navigate("/dashboard/plants") : navigate("/");
      }
    } catch (error) {
      setError("Invalid credentials. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex flex-col gap-20 min-h-screen p-4">
      <Navbar />
      <div className="flex justify-center items-start min-h-screen">
        <section className="container">
          <div className="flex flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="w-full">
              <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                <div className="lg:flex lg:flex-wrap">
                  {/* Left column container */}
                  <div className="px-4 py-6 lg:w-6/12">
                    <div className="md:mx-6 md:py-6">
                      {/* Logo */}
                      <div className="text-center">
                        <img
                          className="mx-auto w-32"
                          src="images/planting.png"
                          alt="logo"
                        />
                        <h4 className="mb-6 mt-1 text-xl font-semibold">
                          We are The Plant Team
                        </h4>
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                      </div>

                      <form onSubmit={handleSubmit}>
                        <p className="mb-4">Please login to your account</p>
                        {/* Username input */}
                        <div className="mb-4">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            required
                          />
                        </div>

                        {/* Password input */}
                        <div className="mb-4">
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            required
                          />
                        </div>

                        {/* Submit button */}
                        <div className="mb-6 text-center">
                          <button
                            className="mb-3 inline-block w-full rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="submit"
                            style={{
                              background:
                                "linear-gradient(90deg, rgba(34,197,94,1) 0%, rgba(0,255,188,1) 100%)",
                            }}
                          >
                            Log in
                          </button>

                          {/* Forgot password link */}
                          <a
                            href="#!"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            Forgot password?
                          </a>
                        </div>

                        {/* Register button */}
                        <div className="flex items-center justify-between">
                          <p className="mb-0 mr-2">Don't have an account?</p>
                          <button
                            type="button"
                            className="inline-block rounded border-2 border-red-500 px-6 py-2 text-xs font-medium uppercase leading-normal text-red-500 transition duration-150 ease-in-out hover:bg-red-500 hover:text-white focus:border-red-600 focus:text-red-600 focus:outline-none focus:ring-0 active:border-red-700 active:text-red-700"
                            onClick={handleRegisterClick}
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* Right column container with an image */}
                  <div className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none">
                    <img
                      src="images/julia.jpg"
                      alt="Background"
                      className=" object-cover rounded-b-lg lg:rounded-r-lg lg:rounded-bl-none"
                      style={{
                        height: "550px",
                        width: "650px",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
