import * as React from 'react';
import './Input.scss';
import { Message } from '../../utils/enums';
import * as Interfaces from '../../utils/interfaces';

type Exclude = 'onChange' | 'value';

interface IInputProps extends Omit<React.ButtonHTMLAttributes<HTMLInputElement>, Exclude> {
    value?: string;
    placeholder?: string;
    className?: string;
    error?: boolean;
    isDisabled?: boolean;
    type?: any;
    icon?: string;
    msgtype?: Message,
    msg?: string;
    rules?: Interfaces.IRule[];
    onChange?(e: EventTarget & HTMLInputElement): void;
}

interface IInputState {
    value: any;
    rules: Interfaces.IRule[];
    msgtype: Message;
    msg: string;
    isChanged: boolean;
    isError: boolean;
    errorsToRender: JSX.Element[]
}

export default class Input extends React.Component<IInputProps, IInputState> {
    state = {
        value: this.props.value || '',
        rules: this.props.rules || [], 
        msgtype: this.props.msgtype || Message.NONE,
        msg: this.props.msg || '',
        isChanged: false,
        isError: true,
        errorsToRender: []
    };

    render() {
        const {
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
                <div className={icon ? `input-icon ${icon}` : ''}></div>
                <input
                    type={type || 'text'}
                    value={this.state.value}
                    onChange={this.onChange}
                    placeholder={placeholder}
                    {...props}
                />
                <div className='msg-block'>
                    { this.state.msgtype === Message.INFO ? <div className='input-msg info-msg'>{this.state.msg}</div> : '' }
                    { this.state.msgtype === Message.ERROR ? <div className='input-msg error-msg'>{this.state.msg}</div> : '' }
                    { this.state.msgtype === Message.SUCCESS ? <div className='input-msg success-msg'>{this.state.msg}</div> : '' }
                    { this.state.isChanged ? this.state.errorsToRender : '' }
                </div>
            </div>
        );
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const errorsToRender = this.getErrorsToRender(target.value)

        this.setState({
            value: target.value,
            isChanged: true,
            errorsToRender: errorsToRender,
            isError: errorsToRender.length > 0
        });

        this.props.onChange && this.props.onChange(target);
    };

    getErrorsToRender(value: string) {
        const { rules } = this.state;

        let errorsToRender: JSX.Element[] = [];

        rules && rules.forEach((rule: Interfaces.IRule, idx: number) => {
            const args: Interfaces.IRuleArgs = rule.args ? rule.args : {} ;
            args.value = value;
            const errorMsg = rule.rule(args);
            if (errorMsg.length > 0) {
                errorsToRender.push(<div key={`msg-${idx}`} className='input-msg-container'>
                    <div className='input-msg-icon error-msg'></div>
                    <div className='input-msg error-msg'>{errorMsg}</div>
                </div>);
            }
        });

        return errorsToRender;
    }
}
