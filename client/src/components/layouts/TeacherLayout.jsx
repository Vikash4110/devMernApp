import { Link, Outlet, Navigate } from "react-router-dom";
import { FaUser, FaHome } from "react-icons/fa";
import { useAuth } from "../../store/auth";

const TeacherLayout = () => {
  const { user, isLoading } = useAuth();
  console.log("Teacher layout", user);

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  // Check if user is null before accessing properties
  if (!user || !user.isTeacher) {
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
                <Link to="/teacher/classes" className="flex items-center space-x-2">
                  <FaUser />
                  <span>My Classes</span>
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

export default TeacherLayout;
