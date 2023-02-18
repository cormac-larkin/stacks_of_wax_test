import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import baseURL from "../../baseURL";
import styles from "./registerPage.module.css";
import { AuthContext } from "../../context/auth/AuthContext";

const RegisterPage = () => {
  // Context state and setter for currently logged in User (will be set upon successful registration/login)
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);

  const [newUser, setNewUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    dateOfBirth: "",
    joinDate: new Date().toISOString().slice(0, 10),
    lastLogin: new Date().toISOString().slice(0, 10),
  });

  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewUser({ ...newUser, [name]: value });
  };

  const checkPasswordsMatch = () => {
    if (confirmPasswordValue !== newUser.password) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      newUser.email &&
      newUser.firstName &&
      newUser.lastName &&
      newUser.password &&
      passwordsMatch
    ) {
      const response = await fetch(`${baseURL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.status === 200) {
        await setAuthenticatedUser(response.json()); // Set the currently logged in User, so it is available in other components through the ContextProvider
        console.log(authenticatedUser);
        console.log("Registration successful");
      }

      if (response.status === 401) {
        alert("That email address is already in use! Please try another");
      }

      if (response.status === 500) {
        alert("Something went wrong on our end, please try again later");
      }
    } else {
      alert(
        "Please ensure you have filled out all the fields and confirmed your password correctly."
      );
    }
  };

  useEffect(() => {
    checkPasswordsMatch();
  });

  return (
    <div className={styles.container}>
      <header className={styles.formHeader}>
        <h1 className={styles.mainHeading}>Create an Account</h1>
        <h4 className={styles.subHeading}>
          Become a member to add your own collections!
        </h4>
      </header>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="you@example.com"
          value={newUser.email}
          onChange={handleChange}
        ></input>
        <label htmlFor="first-name">First Name</label>
        <input
          type="text"
          id="first-name"
          name="firstName"
          placeholder="Your first name"
          value={newUser.firstName}
          onChange={handleChange}
        ></input>
        <label htmlFor="last-name">Last Name</label>
        <input
          type="text"
          id="last-name"
          name="lastName"
          placeholder="Your last name"
          value={newUser.lastName}
          onChange={handleChange}
        ></input>
        <label htmlFor="date-of-birth">Date of Birth</label>
        <input
          type="date"
          id="date-of-birth"
          name="dateOfBirth"
          value={newUser.dateOfBirth}
          onChange={handleChange}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Must be at least 8 characters long"
          value={newUser.password}
          onChange={(e) => {
            handleChange(e);
          }}
        ></input>
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          style={
            !passwordsMatch ? { boxShadow: "0 0 0 2px rgb(255, 0, 0)" } : null
          }
          type="password"
          id="confirm-password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={confirmPasswordValue}
          onChange={(e) => {
            setConfirmPasswordValue(e.target.value);
          }}
        ></input>
        {!passwordsMatch ? "Passwords must match" : null}
        <button type="submit">Register</button>
      </form>
      <Link to="/login">Already have an account? Log In here!</Link>
    </div>
  );
};

export default RegisterPage;
