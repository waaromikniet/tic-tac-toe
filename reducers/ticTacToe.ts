import { Action } from "../actions"
import { ITicTacToe, Option, Player, Difficulty } from "../models";
import { buildOptions, buildPlayers, buildWinnerValues } from "../builders";

const defaultState: ITicTacToe = {
    difficulty: Difficulty.Easy,
    options: buildOptions(Difficulty.Easy),
    players: buildPlayers(),
    currentPlayer: buildPlayers()[0],
    playerWinner: null
};

const ticTacToe = (state = defaultState, action: Action): ITicTacToe => {
    switch (action.type) {
        case "NEXT_PLAYER":
            return {
                ...state,
                currentPlayer: state.currentPlayer.id < state.players.length
                    ? state.players[state.currentPlayer.id] // id + 1 - 1
                    : state.players[0]
            }
        case "SELECT_OPTION":
            return {
                ...state,
                options: state.options.map((option) => {
                    if (option.value === action.option.value) {
                        return {
                            ...option,
                            owner: {
                                ...state.currentPlayer
                            }
                        }
                    }
                    return {
                        ...option
                    }
                })
            }
        case "CHECK_WINNER":
            let winnerValues = buildWinnerValues(state);
            if (winnerValues.length) {
                return {
                    ...state,
                    options: state.options.map((option) => {
                        return {
                            ...option,
                            isWinner: winnerValues.filter(v => v === option.value).length === 1
                        }
                    }),
                    playerWinner: state.currentPlayer
                }
            }
            return {
                ...state
            }
        case "RESET_GAME":
            return {
                ...state,
                difficulty: state.difficulty,
                options: buildOptions(state.difficulty),
                players: buildPlayers(),
                currentPlayer: buildPlayers()[0],
                playerWinner: null
            }
        case "SET_DIFFICULTY":
            return {
                ...state,
                difficulty: action.difficulty,
                options: buildOptions(action.difficulty)
            }
        default:
            return state;
    }
};

export default ticTacToe;