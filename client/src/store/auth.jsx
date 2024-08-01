import { createContext, useContext, useState, useEffect } from "react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authorizationToken = `Bearer ${token}`;

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
    setIsLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getServiceData = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/data/service`, {
        method: "GET",
      });
      if (response.ok) {
        const services = await response.json();
        setServices(services.msg);
      } else {
        console.error("Error fetching services data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userAuthentication();
    getServiceData();
  }, [authorizationToken]);

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, logoutUser, user, services, authorizationToken, isLoading }}>
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
