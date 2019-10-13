import React from "react";
import ReactDOM from "react-dom";
import rock from "./icons8-hand-rock-500.png";
import paper from "./icons8-hand-500.png";
import scissors from "./icons8-hand-scissors-500.png";
import "./styles.css";
import classNames from "classnames";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.rockref = React.createRef();
    this.paperref = React.createRef();
    this.scissorsref = React.createRef();
    this.state = {
      userscore: 0,
      computerscore: 0,
      userChoice: "",
      computerChoice: "",
      resultText: "Let Gets stated!!",
      result: ""
    };
  }
  getcomputerChoice = () => {
    const choice = ["r", "p", "s"];
    const randchoice = Math.floor(Math.random() * 3);
    return choice[randchoice];
  };
  componentWillUnmount() {
    clearTimeout(this.interval);
  }
  getresultText = (result, userChoice, computerChoice) => {
    let text;
    switch (result) {
      case "win":
        text = `${this.getWord(userChoice)} and ${this.getWord(
          computerChoice
        )} you wins!! :(`;
        break;
      case "lose":
        text = `${this.getWord(userChoice)} and ${this.getWord(
          computerChoice
        )} you lose!! :)`;
        break;
      case "draw":
        text = `${this.getWord(userChoice)} and ${this.getWord(
          computerChoice
        )} it draw :)`;
        break;
      default:
        console.log("default");
    }
    return text;
  };
  getWord = letter => {
    switch (letter) {
      case "r":
        return "Rock";
      case "p":
        return "Paper";
      case "s":
        return "Scissors";
      default:
        console.log("default case");
    }
  };
  getResult = (userChoice, computerChoice) => {
    switch (userChoice + computerChoice) {
      case "rs":
      case "sp":
      case "pr":
        return "win";
      case "sr":
      case "ps":
      case "rp":
        return "lose";
      case "rr":
      case "pp":
      case "ss":
        return "draw";
      default:
        console.log("nothing");
    }
  };

  rungame = userchoice => {
    const computerchoice = this.getcomputerChoice();
    const result = this.getResult(userchoice, computerchoice);
    console.log(result);
    this.setState(
      prevstate => {
        console.log(prevstate);
        let userscore = prevstate.userscore;
        let computerscore = prevstate.computerscore;
        if (result === "win") {
          userscore = prevstate.userscore + 1;
        } else if (result === "lose") {
          computerscore = prevstate.computerscore + 1;
        }

        return {
          userscore: userscore,
          computerscore: computerscore,
          userChoice: this.getWord(userchoice),
          computerChoice: this.getWord(computerchoice),
          resultText: this.getresultText(result, userchoice, computerchoice),
          result
        };
      },
      () => {
        setTimeout(() => {
          this.setState({
            result: "normal"
          });
        }, 300);
      }
    );
  };
  render() {
    return (
      <div className="App">
        <header>Rock Paper Scissor</header>
        <div id="score">
          <span id="user_badge" className="badge">
            user
          </span>
          <span id="computer_badge" className="badge">
            comp
          </span>
          <span style={{ fontSize: 25 }}>{this.state.userscore}</span>:
          <span style={{ fontSize: 25 }}>{this.state.computerscore}</span>
        </div>
        <div id="result">{this.state.resultText}</div>
        <div id="choices">
          <img
            src={rock}
            alt="rock"
            id="rock"
            className={classNames({
              green:
                this.state.result === "win" && this.state.userChoice === "Rock",
              red:
                this.state.result === "lose" &&
                this.state.userChoice === "Rock",
              grey:
                this.state.result === "draw" && this.state.userChoice === "Rock"
            })}
            onClick={() => this.rungame("r")}
          />
          <img
            src={paper}
            alt="paper"
            id="paper"
            className={classNames({
              green:
                this.state.result === "win" &&
                this.state.userChoice === "Paper",
              red:
                this.state.result === "lose" &&
                this.state.userChoice === "Paper",
              grey:
                this.state.result === "draw" &&
                this.state.userChoice === "Paper"
            })}
            onClick={() => this.rungame("p")}
          />
          <img
            src={scissors}
            alt="scissors"
            id="scissors"
            className={classNames({
              green:
                this.state.result === "win" &&
                this.state.userChoice === "Scissors",
              red:
                this.state.result === "lose" &&
                this.state.userChoice === "Scissors",
              grey:
                this.state.result === "draw" &&
                this.state.userChoice === "Scissors"
            })}
            onClick={() => this.rungame("s")}
          />
        </div>
        {this.state.userChoice && (
          <div style={{ textAlign: "center" }}>
            user: {this.state.userChoice}
          </div>
        )}
        {this.state.computerChoice && (
          <div style={{ textAlign: "center" }}>
            comp: {this.state.computerChoice}
          </div>
        )}
        <p id="move">make your move</p>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
