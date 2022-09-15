import { useEffect, useState } from "react";

export const Timer = () => {
  const [timer, setTimer] = useState<number>(10);
  const [isPaused, setIsPaused] = useState(true);

  function handlePause() {
    setIsPaused(true);
  }

  function handleReset() {
    setTimer(10);
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
      <div> {timer}</div>
      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};
