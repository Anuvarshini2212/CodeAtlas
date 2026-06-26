import {
  createContext,
  useEffect,
  useState,
} from "react";

export const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);

 useEffect(() => {

  const storedUser =
    localStorage.getItem("user");

  const token =
    localStorage.getItem("token");

  if (
    storedUser &&
    token
  ) {
    const user =
      JSON.parse(storedUser);

    user.token = token;

    setUser(user);
  }

  setLoading(false);

}, []);

  const login = (data) => {

  localStorage.setItem(
    "user",
    JSON.stringify(data)
  );

  localStorage.setItem(
    "token",
    data.token
  );

  setUser(data);

};
  const logout = () => {

  localStorage.removeItem("user");

  localStorage.removeItem("token");

  setUser(null);

};
const [loading, setLoading] =
  useState(true);

  return (
   <AuthContext.Provider
  value={{
    user,
    login,
    logout,
    loading,
  }}
>
      {children}
    </AuthContext.Provider>
  );
};