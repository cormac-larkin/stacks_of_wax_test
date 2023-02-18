import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/auth/AuthContext";

import Layout from "./components/layout/Layout";
import RegisterPage from "./components/pages/RegisterPage";
import LoginPage from "./components/pages/LoginPage";
import AccountPage from "./components/pages/AccountPage";
import LoadingSpinner from "./components/ui/LoadingSpinner";

import baseURL from "./baseURL";

const App = () => {

  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

   // When the App first loads, send a request to check if this client is authenticated (has a valid session cookie).
  useEffect(() => {
    const authenticateUser = async () => {
      const response = await fetch(`${baseURL}/auth/authenticate`, {
        method: "GET",
        withCredentials: true,
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      // If this client has an active session, the API will return an object containing all the info from the 'user' table.
      // Set this object as 'authenticatedUser' if it is returned.
      // If we don't get a 200 response, this client is NOT authenticated. We can leave 'authenticatedUser' as null.
      if (response.status === 200) {
        setAuthenticatedUser(await response.json());
      }
      setIsLoading(false); // After the API call concludes, set isLoading to false. We can now render the App.
    };
    authenticateUser();
  }, []);

  return isLoading ? <LoadingSpinner /> :
  (
    <BrowserRouter>
      <Layout>
        <AuthContext.Provider value={{ authenticatedUser, setAuthenticatedUser }}>
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Routes>
        </AuthContext.Provider>
      </Layout>
    </BrowserRouter> 
  );
};

export default App;
