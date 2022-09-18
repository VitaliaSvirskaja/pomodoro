import { useEffect, useState } from "react";
import { timerUtils } from "../utils/timerUtils";

interface Props {
  initialTimer: number;
}

export const Timer = (props: Props) => {
  const [timer, setTimer] = useState<number>(
    timerUtils.minutesToSeconds(props.initialTimer)
  );
  const [isPaused, setIsPaused] = useState(true);
  const displayedTimer = timerUtils.secondsToDisplayedTimer(timer);

  function handlePause() {
    setIsPaused(true);
  }

  function handleReset() {
    setTimer(timerUtils.minutesToSeconds(props.initialTimer));
  }

  function handleStart() {
    setIsPaused(false);
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

  return (
    <div>
      <div> {displayedTimer}</div>
      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};
