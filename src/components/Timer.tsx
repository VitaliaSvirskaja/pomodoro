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
    <div>
      <div> {displayedTimer}</div>
      <div>
        <button onClick={onStart}>Start</button>
        <button onClick={onPause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};
