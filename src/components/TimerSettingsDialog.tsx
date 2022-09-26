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
  }, [defaultTimer, props.isOpen]);

  function handleSaveSettings(event: React.FormEvent<HTMLFormElement>) {
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
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="mx-auto flex w-full max-w-sm flex-col gap-2 rounded bg-white p-6">
          <Dialog.Title className="text-lg font-medium">
            Timer Settings
          </Dialog.Title>
          <form
            onSubmit={handleSaveSettings}
            className="flex flex-col items-center justify-center gap-3"
          >
            <Input
              label="Pomodoro"
              type={"number"}
              min={1}
              onChange={(event) => {
                setPomodoroTimer(event.target.valueAsNumber);
              }}
              value={pomodoroTimer}
              error={pomodoroTimer < 0 ? "A timer can't be negative!" : ""}
            />
            <Input
              label="Short Break"
              type={"number"}
              min={0}
              onChange={(event) => {
                if (event.target.valueAsNumber === parseInt("e")) {
                  setShortBreakTimer(0);
                } else {
                  setShortBreakTimer(event.target.valueAsNumber);
                }
              }}
              onBlur={() => {
                if (isNaN(shortBreakTimer)) {
                  setShortBreakTimer(0);
                } else {
                  setShortBreakTimer(shortBreakTimer);
                }
              }}
              value={isNaN(shortBreakTimer) ? "" : shortBreakTimer}
              error={shortBreakTimer < 0 ? "A timer can't be negative!" : ""}
            />

            <Input
              label="Long Break"
              type={"number"}
              min={0}
              onChange={(event) => {
                if (event.target.valueAsNumber === parseInt("e")) {
                  setLongBreakTimer(0);
                } else {
                  setLongBreakTimer(event.target.valueAsNumber);
                }
              }}
              onBlur={() => {
                if (isNaN(longBreakTimer)) {
                  setLongBreakTimer(0);
                } else {
                  setLongBreakTimer(longBreakTimer);
                }
              }}
              value={isNaN(longBreakTimer) ? "" : longBreakTimer}
              error={longBreakTimer < 0 ? "Invalid input!" : ""}
            />

            <div className=" flex gap-3">
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
