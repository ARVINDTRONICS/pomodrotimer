import React from "react";
import "./index.scss";
import Up from "../../assets/up.svg";
import Down from "../../assets/down.svg";
const ButtonTimer = ({
  title,
  handleBreakTime,
  handleSessionTime,
  breakTime,
  sessionTime
}) => {
  return (
    <div className="button-wrap">
      <h2 id={title === "Break" ? "break-label" : "session-label"}>{title}</h2>
      <div className="timer-change-wrap">
        <img
          src={Up}
          alt="up"
          onClick={() => {
            title === "Break"
              ? handleBreakTime("increase")
              : handleSessionTime("increase");
          }}
          id={title === "Break" ? "break-increment" : "session-increment"}
        />
        <span id={title === "Break" ? "break-length" : "session-length"}>
          {title === "Break" ? breakTime : sessionTime}
        </span>
        <img
          src={Down}
          alt="down"
          onClick={() => {
            title === "Break"
              ? handleBreakTime("decrease")
              : handleSessionTime("decrease");
          }}
          id={title === "Break" ? "break-decrement" : "session-decrement"}
        />
      </div>
    </div>
  );
};

export default ButtonTimer;
