import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./navBar.module.css";


const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
        if(window.innerWidth > 600) { // Ensure this value matches the breakpoint in the CSS media-query
            setShowDropdown(false);
        }
    })
  }, [])

  return (
    <>
      <nav>
        <div className={styles.header}>
          <div className={styles.brandTitle}>Brand</div>

          <ul className={styles.navLinks}>
            <li>About</li>
            <li>Contact</li>
            <li>Sign In</li>
          </ul>

          {/* Hamburger Toggle Button appears on small screens, handled by CSS media query */}
          <div className={styles.toggleButton} onClick={() => setShowDropdown(prevState => !prevState)}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </div>
        </div>
        {showDropdown && (
          <div className={styles.dropDownMenu}>
            <ul className={styles.dropDownLinks}>
            <li>About</li>
            <li>Contact</li>
            <li>Sign In</li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default NavBar;
