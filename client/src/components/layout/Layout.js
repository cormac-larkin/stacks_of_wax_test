import React from "react";
import NavBar from "./NavBar";
import styles from "./layout.module.css";

const Layout = (props) => {
  return (
    <>
      <NavBar />
      <main className={`${styles.main} bg`}>{props.children}</main>
    </>
  );
};

export default Layout;
