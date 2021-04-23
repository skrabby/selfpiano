import * as React from 'react';
import './Input.scss';

type Exclude = 'onChange' | 'value';

interface IInputProps extends Omit<React.ButtonHTMLAttributes<HTMLInputElement>, Exclude> {
    value?: string;
    placeholder?: string;
    className?: string;
    error?: boolean;
    isDisabled?: boolean;
    type?: any;
    icon?: string;
    onChange?(e: EventTarget & HTMLInputElement): void;
}

interface IInputState {
    value: any;
}

export default class Input extends React.Component<IInputProps, IInputState> {
    state = { value: this.props.value || '' };

    render() {
        const {
            value,
            placeholder,
            className,
            error,
            onChange,
            type,
            isDisabled,
            icon,
            ...props
        } = this.props;

        return (
            <div className={`input ${className}`}>
                <div className={icon ? `icon ${icon}` : ''}></div>
                <input
                    type={type || 'text'}
                    value={this.state.value}
                    onChange={this.onChange}
                    placeholder={placeholder}
                    {...props}

                />
            </div>
        );
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;

        this.setState({value: target.value} );

        this.props.onChange && this.props.onChange(target);
    };
}
