function minutesToSeconds(minutes: number): number {
  if (minutes < 0) {
    throw new Error(
      "Only positive numbers can be converted to seconds. The provided value is: " +
        minutes
    );
  }
  return minutes * 60;
}

function secondsToDisplayedTimer(seconds: number): string {
  let minutesString = String(Math.trunc(seconds / 60));
  let secondsString = String(seconds % 60);
  if (seconds < 0) {
    throw new Error(
      "Only positive numbers can be converted. The provided value is: " +
        seconds
    );
  }
  if (minutesString.length === 1) {
    minutesString = "0" + minutesString;
  }
  if (secondsString.length === 1) {
    secondsString = "0" + secondsString;
  }
  return `${minutesString}:${secondsString}`;
}

export const timerUtils = {
  minutesToSeconds: minutesToSeconds,
  secondsToDisplayedTimer: secondsToDisplayedTimer,
};
