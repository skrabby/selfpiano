import * as React from 'react';
import './Input.scss';
import { Message } from '../../utils/enums';

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
    rules?: any[];
    onChange?(e: EventTarget & HTMLInputElement): void;
}

interface IInputState {
    value: any;
    msgtype: Message;
    msg: string;
}

export default class Input extends React.Component<IInputProps, IInputState> {
    state = {
        value: this.props.value || '',
        msgtype: this.props.msgtype || Message.NONE,
        msg: this.props.msg || ''
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
           // rules,
            ...props
        } = this.props;

        const { value } = this.state;

        let errorsToRender: JSX.Element[] = [];

        let rules: { (val: string, args?: {}): any }[] = [];
        rules.push((v) => v);
        rules.push((v, args) => v);
        rules.push(() => 'Error Message One');
        rules.push(() => 'Error Message One');

        // let rules = {
        //     isRequired: { val: value, args: {} },
        //     maxLength: { val: value, args: {} }       
        // }
        
        rules && rules.forEach((rule, idx) => {

            const errorMsg = rule(value);
            errorsToRender.push(<div key={ idx } className='input-msg error-msg'>{ errorMsg }</div>);
        });

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
                { this.state.msgtype === Message.INFO ? <div className='input-msg info-msg'>{this.state.msg}</div> : '' }
                { this.state.msgtype === Message.ERROR ? <div className='input-msg error-msg'>{this.state.msg}</div> : '' }
                { this.state.msgtype === Message.SUCCESS ? <div className='input-msg success-msg'>{this.state.msg}</div> : '' }
                { errorsToRender }
            </div>
        );
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        

        this.setState({value: target.value} );

        this.props.onChange && this.props.onChange(target);
    };
}
