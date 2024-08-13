import React, { useEffect, useState } from 'react';
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { Instagram } from 'react-content-loader';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authorizationToken } = useAuth();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllUsersData = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/admin/user`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(`users: ${JSON.stringify(data)}`);

      if (data && Array.isArray(data.users)) {
        setUsers(data.users);
      } else {
        console.error('Unexpected data format:', data);
        setUsers([]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${backendUrl}/api/admin/user/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(`users after delete: ${JSON.stringify(data)}`);
      if (data.message === "User Deleted Successfully" && toast.success("User Deleted Successfully")) {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  if (loading) {
    return  <Instagram />;
  }

  if (users.length === 0) {
    return <p>No users found or error fetching users.</p>;
  }

  return (
    <section className="bg-white shadow-md rounded my-6">
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Admin Users Data</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-200">Name</th>
                <th className="py-2 px-4 bg-gray-200">Email</th>
                <th className="py-2 px-4 bg-gray-200">Phone</th>
                <th className="py-2 px-4 bg-gray-200">Update</th>
                <th className="py-2 px-4 bg-gray-200">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((curUser, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4 border">{curUser.username}</td>
                  <td className="py-2 px-4 border">{curUser.email}</td>
                  <td className="py-2 px-4 border">{curUser.phone}</td>
                  <td className="py-2 px-4 border">
                    <Link to={`/admin/users/${curUser._id}/edit`} className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700" >Edit</Link>
                  </td>
                  <td className="py-2 px-4 border">
                    <button className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700" onClick={() => deleteUser(curUser._id)}>Delete</button>
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

export default AdminUsers;
