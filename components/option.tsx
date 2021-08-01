import * as React from "react";
import { Option as OptionModel } from "../models";
import { IMapDispatchToProps, IMapStateToProps } from "../containers/option";

export interface IOwnProps {
    option: OptionModel;
}

interface IProps extends IOwnProps, IMapDispatchToProps, IMapStateToProps {}

interface IState { }

export class Option extends React.Component<IProps, IState> {

    boardOptionClassName() {
        var classNames = ["board__option"];

        if (this.props.option.isWinner) {
            classNames.push("board__option_winner");
        }
        if (this.props.option.owner) {
            classNames.push(`board__option_player_${this.props.option.owner.id}`);
        }
        return classNames.join(" ");
    }

    onSelectOption() {
        if (this.props.state.ticTacToe.playerWinner || this.props.option.owner) {
            return;
        }
        this.props.play(this.props.option);
    }

    circle(color: string) {
        return (
            <svg width="44" height="44">
                <circle cx="22" cy="22" r="20" 
                    stroke={color} strokeWidth="4" fill="transparent" 
                    strokeDasharray="126" strokeDashoffset="126">
                    <animate 
                        attributeName="stroke-dashoffset" 
                        attributeType="XML" 
                        id="circle"
                        fill="freeze"
                        from="126" to="0"
                        begin="0s" dur="0.250s"/>
                </circle>
            </svg>
        );
    }

    cross(color: string) {
        return (
            <svg width="44" height="44">
                <line x1="0" y1="0" x2="40" y2="40" 
                    stroke={color} strokeWidth="4" 
                    strokeDasharray="57" strokeDashoffset="57">
                    <animate 
                        attributeName="stroke-dashoffset" 
                        attributeType="XML" 
                        id="line1"
                        fill="freeze"
                        from="57" to="0"
                        begin="0s" dur="0.125s"/>
                </line>
                <line x1="40" y1="0" x2="0" y2="40" 
                    stroke={color} strokeWidth="4" 
                    strokeDasharray="57" strokeDashoffset="57">
                    <animate 
                        attributeName="stroke-dashoffset" 
                        attributeType="XML" 
                        id="line2"
                        fill="freeze"
                        from="57" to="0"
                        begin="line1.end" dur="0.125s"/>
                </line>
            </svg>
        );
    }

    renderValue() {
        var color = this.props.option.isWinner ? "green" : "black";
        if (!this.props.option.owner) {
            return null;
        }
        if (this.props.option.owner.id === 1) {
            return this.circle(color);
        }
         if (this.props.option.owner.id === 2) {
            return this.cross(color);
        }
        return null;
    }

    render() {
        return (
            <a className={this.boardOptionClassName()} onClick={() => this.onSelectOption()}>
                <span className="board__option__symbol">
                    {this.renderValue()}
                </span>
            </a>
        );
    }
}