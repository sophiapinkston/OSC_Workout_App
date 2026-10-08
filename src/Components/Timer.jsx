
import { useState, useEffect } from "react";

const PRESETS = [30, 60, 90, 120];

function Timer() {
  const [duration, setDuration] = useState(60);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [customTime, setCustomTime] = useState("");

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    if (secondsLeft === 0) {
      setIsRunning(false);
      return;
    }

    const interval = setTimeout(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);

    return () => clearTimeout(interval);
  }, [isRunning, secondsLeft]);

  function startTimer() {
    if (secondsLeft > 0) {
      setIsRunning(true);
    }
  }

  function pauseTimer() {
    setIsRunning(false);
  }

  function resetTimer() {
    setIsRunning(false);
    setSecondsLeft(duration);
  }

  function selectDuration(seconds) {
    setIsRunning(false);
    setDuration(seconds);
    setSecondsLeft(seconds);
  }

  function setCustomDuration() {
    const seconds = Number(customTime);

    if (!Number.isInteger(seconds) || seconds <= 0) {
      return;
    }

    selectDuration(seconds);
    setCustomTime("");
  }

  function addThirtySeconds() {
    setSecondsLeft((previous) => previous + 30);
    setDuration((previous) => previous + 30);
  }

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div style={{ textAlign: "center", padding: "1rem" }}>
      <h2>Rest Timer</h2>

      <h1>
        {minutes}:{String(seconds).padStart(2, "0")}
      </h1>

      <progress
        value={secondsLeft}
        max={duration}
        style={{ width: "250px" }}
      />

      <div style={{ marginTop: "1rem" }}>
        {PRESETS.map((seconds) => (
          <button
            key={seconds}
            onClick={() => selectDuration(seconds)}
            disabled={isRunning}
          >
            {seconds}s
          </button>
        ))}
      </div>

      <div style={{ marginTop: "1rem" }}>
        <input
          type="number"
          min="1"
          step="1"
          placeholder="Custom seconds"
          value={customTime}
          onChange={(event) => setCustomTime(event.target.value)}
          disabled={isRunning}
        />

        <button
          onClick={setCustomDuration}
          disabled={isRunning}
        >
          Set Time
        </button>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={isRunning ? pauseTimer : startTimer}
          disabled={!isRunning && secondsLeft === 0}
        >
          {isRunning ? "Pause" : "Start"}
        </button>

        <button onClick={resetTimer}>
          Reset
        </button>

        <button onClick={addThirtySeconds}>
          +30s
        </button>
      </div>

      {secondsLeft === 0 && (
        <p>Rest complete! Ready for your next set.</p>
      )}
    </div>
  );
}

export default Timer;
