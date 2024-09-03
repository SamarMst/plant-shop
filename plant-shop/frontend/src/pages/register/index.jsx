import React, { useState } from "react";
import Navbar from "../../components/nav-bar";
import axios from "axios";
import Toast from "react-hot-toast";
import { useNavigate } from "react-router";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("BUYER");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post("http://localhost:4000/auth/register", {
        email,
        password,
        role,
      });

      Toast.success(result.data.message);
      navigate("/login");
    } catch (error) {
      Toast.error(error.response.data.message);
    }
  };
  const handleLoginClick = () => {
    navigate("/login");
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
                        <div className="mb-6">
                          <label
                            htmlFor="role"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Role
                          </label>
                          <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            <option value="buyer">Buyer</option>
                            <option value="seller">Seller</option>
                          </select>
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
                            Register
                          </button>
                        </div>

                        {/* Login button */}
                        <div className="flex items-center justify-between">
                          <p className="mb-0 mr-2">You have an account?</p>
                          <button
                            type="button"
                            className="inline-block rounded border-2 border-red-500 px-6 py-2 text-xs font-medium uppercase leading-normal text-red-500 transition duration-150 ease-in-out hover:bg-red-500 hover:text-white focus:border-red-600 focus:text-red-600 focus:outline-none focus:ring-0 active:border-red-700 active:text-red-700"
                            onClick={handleLoginClick}
                          >
                            Login
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

export default Register;
