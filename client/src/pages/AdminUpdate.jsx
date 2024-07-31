import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RegisImg from "../assets/regis.svg"; 
import Footer from "../components/Footer";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function AdminUpdate() {
    
   const [data, setData] = useState({
    username : "",
    email : "", 
    phone : "",
   });

   const params = useParams();
   const { authorizationToken } = useAuth();

   const getSingleUserData = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/admin/user/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
    
      const data = await response.json();
      console.log(`users single data : ${JSON.stringify(data)}`);

      setData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

   useEffect(() => {
    getSingleUserData();
   }, []);

   const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData({
        ...data,
        [name] : value,
    });
   };

   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
       const response = await fetch(`${backendUrl}/api/admin/user/update/${params.id}`, {
        method : "PATCH", 
        headers : {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
        },
        body: JSON.stringify(data),
       });

       if(response.ok) {
          toast.success("Updated Successfully");
       } else {
          toast.error("Not Updated");
       }
    } catch (error) {
     console.error('Error updating user:', error);
     toast.error("Not Updated");
    }
  };

  return (
    <>
      <section className="py-12"> 
        <div className="container mx-auto text-center flex justify-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Update User Data</h1>
        </div>

        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={data.username}
                  onChange={handleInput}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={data.email}
                  onChange={handleInput}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="phone"
                  name="phone"
                  id="phone"
                  autoComplete="off"
                  value={data.phone}
                  onChange={handleInput}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
                >
                  Update
                </button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </>
  );
}
