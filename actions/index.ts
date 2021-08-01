import { Option, Player, Difficulty } from "../models";

export type Action =
    INextPlayer
    | ISelectOption
    | ICheckWinner
    | IResetGame
    | ISetDifficulty;

// Next Player

interface INextPlayer {
    type: "NEXT_PLAYER";
}

export const nextPlayer = (): INextPlayer => {
    return {
        type: "NEXT_PLAYER"
    }
};

// Select Option

interface ISelectOption {
    type: "SELECT_OPTION";
    option: Option;
}

export const selectOption = (option: Option): ISelectOption => {
    return {
        type: "SELECT_OPTION",
        option: option
    }
};

// Check Winner

interface ICheckWinner {
    type: "CHECK_WINNER"
}

export const checkWinner = (): ICheckWinner => {
    return {
        type: "CHECK_WINNER"
    }
}

// Reset Game

interface IResetGame {
    type: "RESET_GAME"
}

export const resetGame = (): IResetGame => {
    return {
        type: "RESET_GAME"
    }
}

// Set Difficulty

interface ISetDifficulty {
    type: "SET_DIFFICULTY";
    difficulty: Difficulty;
}

export const setDifficulty = (difficulty: Difficulty): ISetDifficulty => {
    return {
        type: "SET_DIFFICULTY",
        difficulty: difficulty
    }
}