import { Dialog } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useSettingsContext } from "../context/SettingsContext";
import { Input } from "./Input";
import { DialogButtons } from "./DialogButtons";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const TimerSettingsDialog = (props: Props) => {
  const { saveSettings, defaultTimer } = useSettingsContext();
  const [pomodoroTimer, setPomodoroTimer] = useState(defaultTimer.pomodoro);
  const [shortBreakTimer, setShortBreakTimer] = useState(
    defaultTimer.shortBreak
  );
  const [longBreakTimer, setLongBreakTimer] = useState(defaultTimer.longBreak);

  useEffect(() => {
    setPomodoroTimer(defaultTimer.pomodoro);
    setShortBreakTimer(defaultTimer.shortBreak);
    setLongBreakTimer(defaultTimer.longBreak);
  }, [defaultTimer]);

  function handleSaveSettings(event: React.FormEvent<HTMLFormElement>) {
    // TODO: Prüfen, ob alle Inputfelder befüllt sind bevor gespeichert wird bzw. vorherigen Wert übernehmen
    event.preventDefault();
    if (pomodoroTimer >= 0) {
      saveSettings(pomodoroTimer, shortBreakTimer, longBreakTimer);
      props.onClose();
    } else {
      alert("Pomodoro timer must be set");
    }
  }

  function handleOverlayClick() {
    if (!isNaN(pomodoroTimer)) {
      props.onClose();
    } else {
      alert("Pomodoro Timer is incorrect!");
    }
  }

  function handleCloseClick() {
    if (!isNaN(pomodoroTimer)) {
      props.onClose();
    } else {
      alert("Pomodoro Timer is incorrect!");
    }
  }

  return (
    <Dialog open={props.isOpen} onClose={handleOverlayClick}>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      {/* Full screen container to center the dialog panel*/}
      <div className="fixed inset-0 flex justify-center items-center">
        <Dialog.Panel className=" flex flex-col justify-center items-center gap-4 rounded bg-white p-4">
          <Dialog.Title>Timer Settings</Dialog.Title>
          <form
            onSubmit={handleSaveSettings}
            className="flex flex-col justify-center items-center gap-4"
          >
            <Input
              label="Pomodoro"
              type={"number"}
              min={0}
              onChange={(event) => setPomodoroTimer(event.target.valueAsNumber)}
              value={pomodoroTimer}
            />
            <Input
              label="Short Break"
              type={"number"}
              min={0}
              onChange={(event) =>
                setShortBreakTimer(event.target.valueAsNumber)
              }
              onBlur={() => {
                if (isNaN(shortBreakTimer)) {
                  setShortBreakTimer(0);
                } else {
                  setShortBreakTimer(shortBreakTimer);
                }
              }}
              value={isNaN(shortBreakTimer) ? "" : shortBreakTimer}
            />

            <Input
              label="Long Break"
              type={"number"}
              min={0}
              onChange={(event) =>
                setLongBreakTimer(event.target.valueAsNumber)
              }
              onBlur={() => {
                if (isNaN(longBreakTimer)) {
                  setLongBreakTimer(0);
                } else {
                  setLongBreakTimer(longBreakTimer);
                }
              }}
              value={isNaN(longBreakTimer) ? "" : longBreakTimer}
            />

            <div>
              <DialogButtons type="submit" buttonName="Save" />
              <DialogButtons
                type="button"
                buttonName="Close"
                onClick={handleCloseClick}
              />
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
