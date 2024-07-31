import { useAuth } from "../store/auth";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AdminContacts = () => {
  const [contactData, setContactData] = useState([]);
  const { authorizationToken } = useAuth();

  const getContactsData = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();
      console.log("Contact Data:", data);

      if (response.ok) {
        if (Array.isArray(data.contacts)) {
          setContactData(data.contacts);
        } else {
          console.error("Unexpected data format:", data);
        }
      } else {
        console.error("Failed to fetch contacts:", data);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  // Function to delete a contact by ID
  const deleteContactById = async (id) => {
    try {
      const response = await fetch(`${backendUrl}/api/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        toast.success("Contact deleted successfully");
        // Refresh the contacts after deletion
        getContactsData();
      } else {
        const errorData = await response.json();
        toast.error(`Failed to delete contact: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("An error occurred while deleting the contact");
    }
  };

  useEffect(() => {
    getContactsData();
  }, []);

  return (
    <>
    <section className="py-12 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Admin Contacts</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          {Array.isArray(contactData) && contactData.length > 0 ? (
            contactData.map((curContactData) => {
              const { _id, username, email, message } = curContactData;
              return (
                <div key={_id} className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold text-gray-700">{username}</h2>
                    <button
                      onClick={() => deleteContactById(_id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-gray-600"><strong>Email:</strong> {email}</p>
                  <p className="text-gray-600"><strong>Message:</strong> {message}</p>
                </div>
              );
            })
          ) : (
            <p className="text-gray-600 text-center">No contacts found.</p>
          )}
        </div>
      </div>
    </section>
    </>
    
  );
};

export default AdminContacts;
