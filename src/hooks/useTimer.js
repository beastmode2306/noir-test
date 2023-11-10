import { useState } from "react";
import { formatTime } from "../utils/formatTime.js";

export const useTimer = () => {
  const [timer, setTimer] = useState(null);
  const [elapsedTime, setElapsedTime] = useState("00:00");

  const startTimer = () => {
    let seconds = 0;
    setTimer(
      setInterval(() => {
        seconds++;
        setElapsedTime(formatTime(seconds));
      }, 1000),
    );
  };

  const stopTimer = () => {
    clearInterval(timer);
    setTimer(null);
  };

  const resetTimer = () => {
    stopTimer();
    setElapsedTime("00:00");
  };

  return { elapsedTime, startTimer, stopTimer, resetTimer };
};
