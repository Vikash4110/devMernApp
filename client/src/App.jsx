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
import AdminUsers from "./pages/AdminUsers";
import AdminContacts from "./pages/AdminContacts";
import AdminUpdate from "./pages/AdminUpdate";


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="users" element={<AdminUsers />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="users/:id/edit" element={<AdminUpdate />} />

        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
