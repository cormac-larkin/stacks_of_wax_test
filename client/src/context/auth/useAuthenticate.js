import { useEffect, useState } from "react";
import baseURL from "../../baseURL";

/**
 * Makes a GET request to the API to determine if this client has a valid/active session cookie.
 * If so, the API will return an object containing the User data. We can pass this object to
 * child components through the App component (using AuthContext.Provider)
 * 
 * @returns An object containing:
 * 1. The authenticatedUser state. (Null if the client is not authenticated OR an object containing the User's info if authenticated)
 * 2. The setAuthenticatedUser setter function. (Need to pass this to the Login/RegisterPage components so they can set User)
 * 2. The isLoading state. (Should always be false after the API call, regardless of whether the client is authenticated)
 * 3. The serverError state. (True if a 500 response was received from the server. Otherwise false)
 */
export const useAuthenticate = async () => {

  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {

    // When the App first loads, send a request to check if this client is authenticated (has a valid session cookie).
    const checkIfUserIsAuthenticated = async () => {
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
      } else if (response.status === 500) {
        setServerError(true);
      }
      setIsLoading(false); // After the API call concludes, set isLoading to false. We can now render the App.

    };

    checkIfUserIsAuthenticated();
  }, []);

  console.log("Inside useAuthenticate")
  console.log(authenticatedUser); 
  return {authenticatedUser, setAuthenticatedUser, isLoading, serverError}
};
