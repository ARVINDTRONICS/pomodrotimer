import React from "react";
import "./index.scss";
import Controls from "../Controls/index";
import ButtonTimer from "../ButtonTimer/index";
class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlay: false,
      now: "",
      later: "",
      target: "",
      started: false,
      intervalId: "",
      cycle: "Session",
      breakTime: 5,
      sessionTime: 25,
      minutes: 25,
      seconds: "00"
    };
  }

  reset = () => {
    clearInterval(this.state.intervalId);
    this.setState(
      {
        now: "",
        later: "",
        target: "",
        started: false,
        intervalId: "",
        breakTime: 5,
        sessionTime: 25,
        seconds: "00",
        cycle: "Session"
      },
      () => {
        this.setState({ isPlay: false, minutes: this.state.sessionTime });
      }
    );
  };
  playPause = () => {
    this.setState({ isPlay: !this.state.isPlay }, () => {
      this.timer();
    });
  };
  handleBreakTime = (type) => {
    if (type === "increase" && this.state.breakTime < 60) {
      this.setState((state) => ({
        breakTime: state.breakTime + 1
      }));
    } else if (type === "decrease" && this.state.breakTime > 1) {
      this.setState((state) => ({
        breakTime: state.breakTime - 1
      }));
    }
  };
  handleSessionTime = (type) => {
    if (type === "increase" && this.state.sessionTime < 60) {
      this.setState(
        (state) => ({
          sessionTime: state.sessionTime + 1
        }),
        () => {
          this.setState({ minutes: this.state.sessionTime });
        }
      );
    } else if (type === "decrease" && this.state.sessionTime > 1) {
      this.setState(
        (state) => ({
          sessionTime: state.sessionTime - 1
        }),
        () => {
          this.setState({ minutes: this.state.sessionTime });
        }
      );
    }
  };

  phaseChange = () => {
    clearInterval(this.state.intervalId);
    let changeCycle = this.state.cycle === "Session" ? "Break" : "Session";
    let changeTime =
      this.state.cycle === "Session"
        ? this.state.breakTime
        : this.state.sessionTime;

    this.setState({ cycle: changeCycle });
    this.setState({ now: new Date() }, () => {
      this.setState(
        {
          later: new Date(this.state.now.getTime() + changeTime * 60000),
          target: new Date(),
          minutes: changeTime
        },
        () => {
          this.timer();
        }
      );
    });
  };
  timer = () => {
    if (this.state.isPlay) {
      if (!this.state.started) {
        this.setState({ now: new Date(), started: true }, () => {
          this.setState({
            later: new Date(
              this.state.now.getTime() + this.state.sessionTime * 60000
            ),
            target: new Date()
          });
        });
      }
      var interval = setInterval(() => {
        if (
          this.state.minutes <= 0 &&
          this.state.seconds <= 0 &&
          this.state.isPlay
        ) {
          this.phaseChange();
        } else {
          let distance = this.state.later - this.state.target;
          this.setState((state) => ({
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
            target: state.isPlay
              ? new Date(state.target.setSeconds(state.target.getSeconds() + 1))
              : ""
          }));
          console.log(this.state.minutes, this.state.seconds);
          this.setState({ intervalId: interval });
        }
      }, 1000);
    } else {
      clearInterval(this.state.intervalId);
    }
  };
  render() {
    return (
      <>
        <div className="timer-wrap">
          <ButtonTimer
            title={"Break"}
            handleBreakTime={(type) => {
              if (!this.state.isPlay) {
                this.handleBreakTime(type);
              }
            }}
            breakTime={this.state.breakTime}
            sessionTime={this.state.sessionTime}
          />
          <ButtonTimer
            title={"Session"}
            handleSessionTime={(type) => {
              if (!this.state.isPlay) {
                this.handleSessionTime(type);
              }
            }}
            breakTime={this.state.breakTime}
            sessionTime={this.state.sessionTime}
          />
        </div>
        <div id="timer-label">
          <h2>{this.state.cycle}</h2>
          <h1 id="time-left">{`${this.state.minutes}:${this.state.seconds}`}</h1>
          <Controls
            handlePlay={() => {
              this.playPause();
            }}
            handleReset={() => {
              this.reset();
            }}
            isPlay={this.state.isPlay}
          />
        </div>
      </>
    );
  }
}

export default Display;
