import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthContext";
import baseURL from "../../baseURL";
import styles from "./registerPage.module.css";

const LoginPage = () => {
  // Context state and setter for currently logged in User (will be set upon successful registration/login)
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.email && credentials.password) {
      const response = await fetch(`${baseURL}/auth/login`, {
        method: "POST",
        withCredentials: true,
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.status === 200) {
        await setAuthenticatedUser(await response.json()); // Set the currently logged in User, so it is available in other components through the ContextProvider
        console.log("Login Successful");
      }

      if (response.status === 401) {
        alert("Invalid email/password combination");
      }

      if (response.status === 500) {
        alert("Something went wrong on our end, please try again later");
      }
    } else {
      alert("Please ensure you have filled out all the required fields");
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.formHeader}>
        <h1 className={styles.mainHeading}>Sign In</h1>
        <h4 className={styles.subHeading}>Welcome back!</h4>
      </header>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="you@example.com"
          value={credentials.email}
          onChange={handleChange}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Type your password"
          value={credentials.password}
          onChange={handleChange}
        ></input>
        <button type="submit">Sign In</button>
      </form>
      <Link to="/register">Don't have an account?, sign up here!</Link>
      <Link to="/account">Account</Link>
    </div>
  );
};

export default LoginPage;
