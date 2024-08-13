import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "../store/auth";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ClassEdit = () => {
  const { authorizationToken } = useAuth();
  const [classData, setClassData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchClass();
  }, []);

  const fetchClass = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/teacher/classes/${id}`, {
        method: 'GET',
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching class: ${response.status}`);
      }

      const data = await response.json();
      setClassData(data);
    } catch (error) {
      console.error('Error fetching class:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setClassData({ ...classData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendUrl}/api/teacher/classes/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorizationToken,
        },
        body: JSON.stringify(classData),
      });

      if (!response.ok) {
        throw new Error(`Error updating class: ${response.status}`);
      }

      navigate('/teacher/classes'); // Redirect to classes list after update
    } catch (error) {
      console.error('Error updating class:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Class</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="department"
          value={classData.department || ''}
          onChange={handleChange}
          placeholder="Department"
          required
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="semester"
          value={classData.semester || ''}
          onChange={handleChange}
          placeholder="Semester"
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="group"
          value={classData.group || ''}
          onChange={handleChange}
          placeholder="Group"
          required
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="totalStudents"
          value={classData.totalStudents || ''}
          onChange={handleChange}
          placeholder="Total Students"
          required
          className="border p-2 w-full"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Update Class
        </button>
      </form>
    </div>
  );
};

export default ClassEdit;
