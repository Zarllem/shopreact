import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const changeBalance = (newBalance) => {
    setBalance(newBalance);
  };

  const resetBalance = () => {
    setBalance(10000);
  };

  const loadUser = async () => {
    const user = await axios.get("https://localhost:7038/api/User/Me");
    setUser(user.data);
    setBalance(10000);
    setIsLoading(false);
  };
  useEffect(() => {
    setBalance(10000);
    loadUser();
  }, []);
  return (
    <UserContext.Provider
      value={{
        user,
        loadUser,
        isLoading,
        changeBalance,
        balance,
        resetBalance,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
