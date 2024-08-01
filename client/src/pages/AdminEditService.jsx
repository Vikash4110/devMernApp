import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

const AdminEditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authorizationToken } = useAuth();
  const [service, setService] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [provider, setProvider] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/admin/service/${id}`, {
          method: 'GET',
          headers: {
            Authorization: authorizationToken,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setService(data.service);
        setDescription(data.description);
        setPrice(data.price);
        setProvider(data.provider);
      } catch (error) {
        console.error('Error fetching service details:', error);
        toast.error('Failed to fetch service details');
      }
    };

    fetchServiceDetails();
  }, [id, authorizationToken, backendUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendUrl}/api/admin/service/update/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorizationToken,
        },
        body: JSON.stringify({ service, description, price, provider }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      toast.success(data.message);
      navigate('/admin/services');
    } catch (error) {
      console.error('Error updating service:', error);
      toast.error('Failed to update service');
    }
  };

  return (
    <section className="bg-white shadow-md rounded my-6 p-6">
      <h1 className="text-2xl font-semibold mb-4">Edit Service</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Service Name</label>
          <input
            type="text"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Provider</label>
          <input
            type="text"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
          Update Service
        </button>
      </form>
    </section>
  );
};

export default AdminEditService;
