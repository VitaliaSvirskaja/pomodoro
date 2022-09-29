import { useEffect, useState } from "react";
import { timerUtils } from "../utils/timerUtils";

interface Props {
  initialTimer: number;
  onTimerFinished: () => void;
  isPaused: boolean;
  onPause: () => void;
  onStart: () => void;
}

export const Timer = ({
  initialTimer,
  onTimerFinished,
  isPaused,
  onPause,
  onStart,
}: Props) => {
  const [timer, setTimer] = useState<number>(
    timerUtils.minutesToSeconds(initialTimer)
  );

  const displayedTimer = timerUtils.secondsToDisplayedTimer(timer);

  function handleReset() {
    setTimer(timerUtils.minutesToSeconds(initialTimer));
  }

  useEffect(() => {
    let intervalID: NodeJS.Timer | undefined = undefined;
    intervalID = setInterval(() => {
      setTimer((oldTimer) => {
        if (oldTimer > 0 && !isPaused) {
          return oldTimer - 1;
        }
        return oldTimer;
      });
    }, 1000);
    return () => clearInterval(intervalID);
  }, [isPaused]);

  useEffect(() => {
    if (timer === 0) {
      onTimerFinished();
    }
  }, [timer, onTimerFinished]);

  return (
    <>
      <div className=" text-center text-8xl font-bold text-white ">
        {displayedTimer}
      </div>
      <div className="flex justify-center gap-3 text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-12 w-12 hover:cursor-pointer"
          onClick={onStart}
        >
          <path
            fillRule="evenodd"
            d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
            clipRule="evenodd"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-12 w-12 hover:cursor-pointer"
          onClick={onPause}
        >
          <path
            fillRule="evenodd"
            d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
            clipRule="evenodd"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-12 w-12 hover:cursor-pointer"
          onClick={handleReset}
        >
          <path
            fillRule="evenodd"
            d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </>
  );
};
