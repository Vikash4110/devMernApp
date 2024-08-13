import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Service from "./pages/Service";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Error from "./pages/Error";
import AdminLayout from "./components/layouts/AdminLayout";
import TeacherLayout from "./components/layouts/TeacherLayout";

import AdminUsers from "./pages/AdminUsers";
import AdminContacts from "./pages/AdminContacts";
import AdminUpdate from "./pages/AdminUpdate";
import AdminServices from "./pages/AdminServices";
import AdminAddService from "./pages/AdminAddService";
import AdminEditService from "./pages/AdminEditService";
import UserDashboard from "./pages/UserDashboard"; 
import UpdateUser from "./pages/UpdateUser";
import MyBlog from './pages/MyBlog';
import PTUBlog from './pages/PTUBlog';
import EditBlog from './pages/EditBlog';
import SingleBlog from './pages/SingleBlog';
import ComposeBlog from './pages/ComposeBlog';

import Class from "./pages/Class";
import ClassEdit from "./pages/ClassEdit";
import AddNewClass from "./pages/AddNewClass";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={<UserDashboard />} /> 
        <Route path="/update-profile" element={<UpdateUser />} />
        <Route path="/my-blogs" element={<MyBlog />} />
        <Route path="/blogs" element={<PTUBlog />} />
        <Route path="/compose-blog" element={<ComposeBlog />} />
        <Route path="/my-blogs/edit/:id" element={<EditBlog />} />
        <Route path="/blogs/:id" element={<SingleBlog />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="users" element={<AdminUsers />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="services/add" element={<AdminAddService />} />
          <Route path="services/:id/edit" element={<AdminEditService />} />
          <Route path="users/:id/edit" element={<AdminUpdate />} />
        </Route>
        <Route path="/teacher" element={<TeacherLayout />}>
  <Route path="classes" element={<Class />} />
  <Route path="classes/add" element={<AddNewClass />} />
  <Route path="classes/:id/edit" element={<ClassEdit />} />
</Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
