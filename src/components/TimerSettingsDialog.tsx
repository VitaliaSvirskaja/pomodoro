import { Dialog } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useSettingsContext } from "../context/SettingsContext";
import { Input } from "./Input";
import { DialiogButtons } from "./DialiogButtons";

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
    event.preventDefault();
    saveSettings(pomodoroTimer, shortBreakTimer, longBreakTimer);
    props.onClose();
  }

  return (
    <Dialog open={props.isOpen} onClose={props.onClose}>
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
              required={true}
              onChange={(event) => setPomodoroTimer(event.target.valueAsNumber)}
              value={pomodoroTimer}
            />
            <Input
              label="Short Break"
              type={"number"}
              required={true}
              onChange={(event) =>
                setShortBreakTimer(event.target.valueAsNumber)
              }
              value={shortBreakTimer}
            />

            <Input
              label="Long Break"
              type={"number"}
              required={true}
              onChange={(event) =>
                setLongBreakTimer(event.target.valueAsNumber)
              }
              value={longBreakTimer}
            />

            <div>
              <DialiogButtons type="submit" buttonName="Save" />
              <DialiogButtons
                type="button"
                buttonName="Close"
                onClick={props.onClose}
              />
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
