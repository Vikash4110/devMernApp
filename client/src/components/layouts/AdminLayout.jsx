import { Link, Outlet, Navigate } from "react-router-dom";
import { FaUser, FaHome } from "react-icons/fa";
import { RiContactsBookFill, RiCustomerServiceFill } from "react-icons/ri";
import { useAuth } from "../../store/auth";

const AdminLayout = () => {
  const { user , isLoading} = useAuth();
  console.log("admin layout", user);

  // Check if user is null or undefined, and handle accordingly
  // if (!user.isAdmin) {
  //   return <Navigate to="/" />;
  // }
  if (isLoading) {
    return <h1>Loading ...</h1>
  }
  if (!user.isAdmin) {
      return <Navigate to="/" />;
    }

  return (
    <>
    <br /><br /><br />
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col lg:flex-row justify-between items-center">
            <ul className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
              <li className="hover:bg-blue-700 p-2 rounded">
                <Link to="/admin/users" className="flex items-center space-x-2">
                  <FaUser />
                  <span>Users</span>
                </Link>
              </li>
              <li className="hover:bg-blue-700 p-2 rounded">
                <Link to="/admin/contacts" className="flex items-center space-x-2">
                  <RiContactsBookFill />
                  <span>Contacts</span>
                </Link>
              </li>
              <li className="hover:bg-blue-700 p-2 rounded">
                <Link to="/admin/services" className="flex items-center space-x-2">
                  <RiCustomerServiceFill />
                  <span>Services</span>
                </Link>
              </li>
              <li className="hover:bg-blue-700 p-2 rounded">
                <Link to="/" className="flex items-center space-x-2">
                  <FaHome />
                  <span>Home</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
