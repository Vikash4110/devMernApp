import { useEffect } from "react";
import { useAuth } from "../store/auth";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
export const Logout = () => {
  const { logoutUser } = useAuth(); // Use 'logoutUser' instead of 'LogoutUser'

  useEffect(() => {
    toast.success("Logout Succesfully");
    logoutUser();
  }, [logoutUser]);

  return(
    <>
  
    <Navigate to="/login" />
    </>
  )
};

export default Logout;
