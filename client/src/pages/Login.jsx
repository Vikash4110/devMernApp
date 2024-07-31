import React, { useState } from "react";
import RegisImg from "../assets/regis.svg"; // Ensure this path is correct
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth"; // Import the useAuth hook
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
// const URL = "http://localhost:3000/api/auth/login";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth(); // Get the storeTokenInLS function from context
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials);

    try {
      const response = await fetch(`${backendUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const responseData = await response.json();
      if (response.ok) {
        storeTokenInLS(responseData.token); // Update the context state
        toast.success("Login Successfully")

        navigate("/");
      } else {
        // Use responseData instead of responseData
        toast.error(responseData.extraDetails ? responseData.extraDetails : responseData.message);

        console.log("Invalid Credentials");
      }
    } catch (error) {
      console.log("Login error: ", error);
      alert("An error occurred. Please try again."); // Alert generic error message
    }
  };

  return (
    <>
      <br />
      <br />
      <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 p-6">
        <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="lg:w-1/2 bg-black flex items-center justify-center">
            <img
              src={RegisImg}
              alt="A person logging in"
              className="object-cover h-full"
            />
          </div>
          <div className="lg:w-1/2 p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleInput}
                  placeholder="Enter your email"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleInput}
                  placeholder="Enter your password"
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
              >
                Login
              </button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-gray-600">Don't have an account?</p>
              <Link to="/register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Login;
