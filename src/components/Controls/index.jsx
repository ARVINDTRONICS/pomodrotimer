import React from "react";
import "./index.scss";
import Play from "../../assets/play-button.svg";
import Pause from "../../assets/pause.svg";
import Reset from "../../assets/reset.svg";

const Controls = ({ handlePlay, isPlay, handleReset }) => {
  React.useEffect(() => {}, [isPlay]);

  return (
    <div className="control-wrap">
      {isPlay ? (
        <img id="start_stop" src={Pause} onClick={handlePlay} alt={"Pause"} />
      ) : (
        <img id="start_stop" src={Play} onClick={handlePlay} alt={"Play"} />
      )}
      <img id="reset" src={Reset} onClick={handleReset} alt={"Reset"} />
    </div>
  );
};

export default Controls;
