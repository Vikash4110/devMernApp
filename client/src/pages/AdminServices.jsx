import React, { useEffect, useState } from 'react';
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authorizationToken } = useAuth();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllServicesData = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/admin/service`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(`services: ${JSON.stringify(data)}`);

      if (data && Array.isArray(data.services)) {
        setServices(data.services);
      } else {
        console.error('Unexpected data format:', data);
        setServices([]);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id) => {
    try {
      const response = await fetch(`${backendUrl}/api/admin/service/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(`services after delete: ${JSON.stringify(data)}`);
      if (data.message === "Service Deleted Successfully" && toast.success("Service Deleted Successfully")) {
        setServices((prevServices) => prevServices.filter((service) => service._id !== id));
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  useEffect(() => {
    getAllServicesData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (services.length === 0) {
    return <p>No services found or error fetching services.</p>;
  }

  return (
    <section className="bg-white shadow-md rounded my-6">
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Admin Services Data</h1>
        <div className="mb-4">
          <Link to="/admin/services/add" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
            Add New Service
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-200">Service</th>
                <th className="py-2 px-4 bg-gray-200">Description</th>
                <th className="py-2 px-4 bg-gray-200">Price</th>
                <th className="py-2 px-4 bg-gray-200">Provider</th>
                <th className="py-2 px-4 bg-gray-200">Update</th>
                <th className="py-2 px-4 bg-gray-200">Delete</th>
              </tr>
            </thead>
            <tbody>
              {services.map((curService, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4 border">{curService.service}</td>
                  <td className="py-2 px-4 border">{curService.description}</td>
                  <td className="py-2 px-4 border">{curService.price}</td>
                  <td className="py-2 px-4 border">{curService.provider}</td>
                  <td className="py-2 px-4 border">
                    <Link to={`/admin/services/${curService._id}/edit`} className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700">Edit</Link>
                  </td>
                  <td className="py-2 px-4 border">
                    <button className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700" onClick={() => deleteService(curService._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminServices;
