import { useState } from "react";
import RegisImg from "../assets/regis.svg"; // Ensure this path is correct
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth"; // Import useAuth correctly

const URL = "http://localhost:3000/api/auth/register";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const { storeTokenInLS } = useAuth(); // Destructure storeTokenInLS from useAuth

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // Handle form on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log(response);

      if (response.ok) {
        const res_data = await response.json();
        alert("Registration successful");
        console.log(res_data);
        storeTokenInLS(res_data.token);
        setUser({ username: "", email: "", phone: "", password: "" });
        navigate("/login"); // Redirect to login page on successful registration
      } else {
        const errorData = await response.json(); // Get error details
        console.error("Error inside response: ", errorData); // Log error details
        alert("Registration failed: " + errorData.message); // Alert the error message if available
      }
    } catch (error) {
      console.log("Register error: ", error);
      alert("An error occurred. Please try again."); // Alert generic error message
    }
  };

  return (
    <>
      <br />
      <br />
      <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-6">
        <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="lg:w-1/2 bg-black flex items-center justify-center">
            <img
              src={RegisImg} // Use the imported image
              alt="a nurse with a cute look"
              className="object-cover h-full"
            />
          </div>
          <div className="lg:w-1/2 p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Registration Form</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleInput}
                  placeholder="Enter your username"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInput}
                  placeholder="Enter your email"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={user.phone}
                  onChange={handleInput}
                  placeholder="Enter your phone number"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleInput}
                  placeholder="Enter your password"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                Register Now
              </button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-gray-600">Already have an account? <a href="/login" className="text-blue-600 hover:underline">
                Login
              </a></p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Register;
