import { resetGame, setDifficulty } from "../actions";
import { Difficulty, IState } from "../models";
import { Board, IOwnProps } from "../components/board";
import { connect } from "react-redux";

export interface IMapStateToProps {
  state: IState
}

const mapStateToProps = (state: IState): IMapStateToProps => {
  return {
    state: state
  };
};

export interface IMapDispatchToProps {
  resetGame();
  changeDifficulty(difficulty: Difficulty);
}

const mapDispatchToProps = (dispatch): IMapDispatchToProps => {
  return {
    resetGame: () => {
      dispatch(resetGame());
    },
    changeDifficulty: (difficulty) => {
      dispatch(resetGame());
      dispatch(setDifficulty(difficulty));
    }
  };
};

export default connect<IMapStateToProps, IMapDispatchToProps, IOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Board);