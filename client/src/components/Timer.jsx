import React from "react";
import {
  buildStyles,
  CircularProgressbar,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Timer({ timeLeft, totalTime }) {
  const percentage = (timeLeft / totalTime) * 100;

  return (
    <div className="w-20 h-20">
      <CircularProgressbar
        value={percentage}
        text={`${timeLeft}s`}
        styles={buildStyles({
          textSize: "28px",
          pathColor: "#8b5cf6",
          textColor: "#7c3aed",
          trailColor: "#e9d5ff",
          backgroundColor: "#faf5ff",
        })}
      />
    </div>
  );
}

export default Timer;
