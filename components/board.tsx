import * as React from "react";
import { Difficulty } from "../models";
import Option from "../containers/option";
import { IMapStateToProps, IMapDispatchToProps } from "../containers/board";

export interface IOwnProps { }

interface IProps extends IOwnProps, IMapStateToProps, IMapDispatchToProps { };

interface IState { };

export class Board extends React.Component<IProps, IState> {

  boardClassName() {
    var classNames = ["board"];

    switch (this.props.state.ticTacToe.difficulty) {
      case Difficulty.Easy:
        classNames.push("board_difficulty_easy");
        break;
      case Difficulty.Medium:
        classNames.push("board_difficulty_medium");
        break;
      case Difficulty.Hard:
        classNames.push("board_difficulty_hard");
        break;
    }
    return classNames.join(" ");
  }

  onChangeDifficulty(difficulty: string) {
    this.props.changeDifficulty(parseInt(difficulty))
  }

  renderOptions() {
    const options = this.props.state.ticTacToe.options;
    return options.map((o, k) => <Option option={o} key={k} />)
  }

  render() {
    return (
      <div>
        <p>
          <label>Difficulty:</label>
          <select onChange={(e) => this.onChangeDifficulty(e.currentTarget.value)}>
            <option value={Difficulty.Easy}>Easy</option>
            <option value={Difficulty.Medium}>Medium</option>
            <option value={Difficulty.Hard}>Hard</option>
          </select>
        </p>

        <p><a onClick={() => this.props.resetGame()}>Reset game</a></p>

        {!this.props.state.ticTacToe.playerWinner &&
          <h1>{`Player ${this.props.state.ticTacToe.currentPlayer.id} turn:`}</h1>
        }
        {this.props.state.ticTacToe.playerWinner &&
          <h1>{`Bravo! Player ${this.props.state.ticTacToe.playerWinner.id} won!`}</h1>
        }
        <div className={this.boardClassName()}>
          {this.renderOptions()}
        </div>
      </div>
    );
  }
}
