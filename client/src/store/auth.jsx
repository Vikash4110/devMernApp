import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
  };

  const logoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
    setUser(null);
  };

  const userAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.log("Error in user authentication:", error);
    }
  };

  const getServiceData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/data/service", {
        method: "GET",
      });
      if (response.ok) {
        const services = await response.json();
        setServices(services.msg);
      } else {
        console.error("Error fetching services data");
      }
    } catch (error) {
      console.log("Error in fetching services data:", error);
    }
  };

  useEffect(() => {
    if (token) {
      userAuthentication();
      getServiceData();
    }
  }, [token]);

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, logoutUser, user, services }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
