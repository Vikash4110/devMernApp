import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../store/auth";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AddNewClass = () => {
  const { authorizationToken } = useAuth();
  const [classData, setClassData] = useState({
    department: '',
    semester: '',
    group: '',
    totalStudents: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setClassData({ ...classData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendUrl}/api/teacher/classes/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorizationToken,
        },
        body: JSON.stringify(classData),
      });

      if (!response.ok) {
        throw new Error(`Error adding class: ${response.status}`);
      }

      navigate('/teacher/classes'); // Redirect to classes list after adding
    } catch (error) {
      console.error('Error adding class:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Class</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="department"
          value={classData.department}
          onChange={handleChange}
          placeholder="Department"
          required
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="semester"
          value={classData.semester}
          onChange={handleChange}
          placeholder="Semester"
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="group"
          value={classData.group}
          onChange={handleChange}
          placeholder="Group"
          required
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="totalStudents"
          value={classData.totalStudents}
          onChange={handleChange}
          placeholder="Total Students"
          required
          className="border p-2 w-full"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Add Class
        </button>
      </form>
    </div>
  );
};

export default AddNewClass;
