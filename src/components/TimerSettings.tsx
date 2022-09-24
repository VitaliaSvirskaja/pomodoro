import React, { useState } from "react";
import settingsIcon from "../assets/settingsIcon.png";
import styles from "./TimerSettings.module.css";
import { SettingsDialog } from "./SettingsDialog";

export const TimerSettings = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleSettingsClick() {
    console.log("Settings clicked");
    setIsDialogOpen(!isDialogOpen);
  }

  const confirm = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <div>
        <img
          src={settingsIcon}
          alt="settings-icon"
          className={styles.settingsIcon}
          onClick={handleSettingsClick}
        />
      </div>
      <SettingsDialog isOpen={isDialogOpen} confirm={confirm} />
    </div>
  );
};
