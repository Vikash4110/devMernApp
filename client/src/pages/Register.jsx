import { useState } from "react";
import RegisImg from "../assets/regis.svg"; // Ensure this path is correct
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth"; // Import useAuth correctly
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

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
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!backendUrl) {
      toast.error("Backend URL is not defined. Please check your environment variables.");
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const res_data = await response.json();
        const errorMessage = res_data.extraDetails ? res_data.extraDetails : res_data.message;
        throw new Error(errorMessage);
      }

      const res_data = await response.json();
      storeTokenInLS(res_data.token);
      setUser({ username: "", email: "", phone: "", password: "" });
      toast.success("Registered Successfully");
      navigate("/"); // Redirect to the home page on successful registration

    } catch (error) {
      console.error("Register error: ", error);
      toast.error(error.message || "An error occurred. Please try again.");
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
              src={RegisImg}
              alt="A nurse with a cute look"
              className="object-cover h-full"
            />
          </div>
          <div className="lg:w-1/2 p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Registration Form</h1>
            <form onSubmit={handleSubmit}>
              {["username", "email", "phone", "password"].map((field) => (
                <div className="mb-4" key={field}>
                  <label htmlFor={field} className="block text-gray-700">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === "password" ? "password" : "text"}
                    name={field}
                    value={user[field]}
                    onChange={handleInput}
                    placeholder={`Enter your ${field}`}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
              ))}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
              >
                Register Now
              </button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Register;
