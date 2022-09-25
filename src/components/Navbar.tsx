import { TimerSettings } from "./TimerSettings";
import { useAuthContext } from "../context/AuthContext";
import profileIcon from "../assets/profileIcon.png";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import React from "react";

export const Navbar = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  function handleLoginClick() {
    console.log("clicked");
    return navigate("/login");
  }

  return (
    <div className={styles.navbarContainer}>
      <div>Logo</div>
      <div className={styles.navbarRight}>
        <TimerSettings />
        {user ? (
          <img
            src={profileIcon}
            alt="profile-icon"
            className={styles.profileIcon}
          />
        ) : (
          <button onClick={handleLoginClick} className={styles.loginButton}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};
