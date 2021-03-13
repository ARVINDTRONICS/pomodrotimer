import "./assets/App.scss";
import ButtonTimer from "./components/ButtonTimer/index";
import Display from "./components/Display/index";
import React from "react";
function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Pomodoro Timer</h1>
        <Display />
      </div>
    </div>
  );
}

export default App;
