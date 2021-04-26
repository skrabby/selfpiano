import * as React from "react";
import './Button.scss';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

export class Button extends React.Component<IButtonProps> {

    render() {
        let { className } = this.props;

        className = className || "";

        return (
            <button
                className={`btn ${className}`}
                {...this.props}
            />
        )
    }
}
