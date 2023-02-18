import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import baseUrl from "../../baseURL";

const AccountPage = () => {

  const {authenticatedUser, setAuthenticatedUser} = useContext(AuthContext);

  return authenticatedUser ?  <h1>{`Hi ${authenticatedUser.first_name}!`}</h1> : <h1>Who are you?</h1>;
};
export default AccountPage;
