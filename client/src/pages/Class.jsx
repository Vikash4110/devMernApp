import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../store/auth";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Class = () => {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();
  const { authorizationToken } = useAuth();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/teacher/classes`, {
        method: 'GET',
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (Array.isArray(data)) {
        setClasses(data);
      } else {
        console.error('Expected an array but received:', data);
        setClasses([]);
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
      setClasses([]);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${backendUrl}/api/teacher/classes/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: authorizationToken,
        },
      });
      fetchClasses();
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/teacher/classes/${id}/edit`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Your Classes</h1>
      <button 
        onClick={() => navigate('/teacher/classes/add')} 
        className="mb-6 px-6 py-3 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
      >
        Add New Class
      </button>
      {classes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((classItem) => (
            <div key={classItem._id} className="border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white">
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">{classItem.department}</h2>
              <p className="text-gray-600"><span className="font-bold">Semester:</span> {classItem.semester}</p>
              <p className="text-gray-600"><span className="font-bold">Class Group:</span> {classItem.group}</p>
              <p className="text-gray-600"><span className="font-bold">Total Students:</span> {classItem.totalStudents}</p>
              <div className="mt-4 flex space-x-3">
                <button 
                  onClick={() => handleEdit(classItem._id)} 
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md shadow hover:bg-yellow-600 transition-transform transform hover:scale-105"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(classItem._id)} 
                  className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition-transform transform hover:scale-105"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No classes available. Click "Add New Class" to create one.</p>
      )}
    </div>
  );
};

export default Class;
