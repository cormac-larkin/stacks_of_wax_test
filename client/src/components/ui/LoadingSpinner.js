import React from "react";
import styles from "./loadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={`${styles.container} bg`}>
      <div className={styles.loading}></div>
    </div>
  );
};

export default LoadingSpinner;
