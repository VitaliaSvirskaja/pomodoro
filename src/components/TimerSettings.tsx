import React, { useState } from "react";
import settingsIcon from "../assets/settingsIcon.png";
import styles from "./TimerSettings.module.css";
import { TimerSettingsDialog } from "./TimerSettingsDialog";

export const TimerSettings = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleSettingsClick() {
    setIsDialogOpen(!isDialogOpen);
  }

  function handleCloseDialog() {
    setIsDialogOpen(false);
  }

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
      <TimerSettingsDialog isOpen={isDialogOpen} onClose={handleCloseDialog} />
    </div>
  );
};
