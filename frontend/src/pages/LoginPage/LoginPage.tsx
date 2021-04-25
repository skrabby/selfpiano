import React from 'react';
import * as Components from '../../components';
import { Message } from '../../utils/enums';
import * as Rules from '../../utils/rules';
import * as Interfaces from '../../utils/interfaces';

import './LoginPage.scss';

enum Card {
    LOGIN,
    REGISTER,
    FORGOT_PASSWORD
}

interface LoginPageState {
    card: Card;
    statusMsgType: Message;
    statusMsg: string
}

class LoginPage extends React.Component<LoginPageState> {

    state = {
        card: Card.LOGIN,
        statusMsgType: Message.NONE,
        statusMsg: ''
    }

    onRegisterClick = () => {
        this.setState( { card: Card.REGISTER } );
    }

    onLoginClick = () => {
        this.setState( { card: Card.LOGIN } );
    }

    onForgotPasswordClick = () => {
        this.setState( { card: Card.FORGOT_PASSWORD } );
    }

    getMsgColor = () => {
        const { statusMsgType } = this.state;

        if (statusMsgType === Message.ERROR) {
            return 'error-msg';
        } else if (statusMsgType === Message.INFO) {
            return 'info-msg';
        }
        return '';
    }

    renderInputs() {
        switch (this.state.card) {
            case Card.REGISTER:
                return  <div>
                            <Components.Input {...fields.login} />
                            <Components.Input {...fields.firstName } />
                            <Components.Input {...fields.lastName } />
                            <Components.Input {...fields.password} />
                            <Components.Input {...fields.rptPassword} />
                        </div>
            case Card.LOGIN:
                return  <div>
                            <Components.Input {...fields.login} />
                            <Components.Input {...fields.password} />
                        </div>
            case Card.FORGOT_PASSWORD:
                return  <div>
                            <Components.Input {...fields.login} />
                        </div>
        }
    }

    renderSwapLink() {
         if (this.state.card === Card.REGISTER) {
            return <div className='register-text'>No account yet? <span onClick={() => this.onLoginClick()} className='link-text'>Login</span></div>
         }
         else if (this.state.card === Card.LOGIN) {
            return <div className='register-text'>No account yet? <span onClick={() => this.onRegisterClick()} className='link-text'>Register</span></div>
         }
         return <div className='register-text'>Already have an account? <span onClick={() => this.onLoginClick()} className='link-text'>Login</span></div>;
    }

    renderButton() {
        switch (this.state.card) {
            case Card.LOGIN:
                return <button type="submit" className='btn btn-primary center'>Login</button>
            case Card.REGISTER:
                return <button type="submit" className='btn btn-primary center'>Register</button> 
            case Card.FORGOT_PASSWORD:
                return <button type="submit" className='btn btn-primary center'>Submit</button> 
        }
    }

    render() {

        return (
            <div className='wrapper'>
                <div className='card abs-center login'>
                    <div className='logo img'></div>
                    <div className='logo title'>Selfpiano</div>
                    <div className='input-block'>
                    <div className={'status-msg ' + this.getMsgColor()}>
                        { this.state.statusMsgType !== Message.NONE && this.state.statusMsg }
                    </div>
                    { this.renderInputs() }
                    </div>
                    {(this.state.card === Card.LOGIN || this.state.card === Card.REGISTER) ?
                        <div className='social-auth-block'>
                            <div className='social-icon facebook'></div>
                            <div className='social-icon google'></div>
                            <div className='social-icon twitter'></div>
                        </div>
                        :
                        ''
                    }
                    <div className='btn-submit-block'>
                    { this.renderButton() }
                    </div>
                    {this.state.card === Card.LOGIN ?
                        <div className='password-reminder link-text' onClick={() => this.onForgotPasswordClick()}>Forgot your password?</div>
                        :
                        ''
                    }
                    { this.renderSwapLink() }
                </div>
            </div>
        )
    }
}

export default LoginPage;

const fields = {
    login: {
        className: 'input md login',
        placeholder: 'Email*',
        icon: 'email',
        rules: [{ rule: Rules.isRequired, args: { value: '' } },
                { rule: Rules.minLength, args: { value: '', minLength: 4 } }
            ]
    },
    password: {
        className: 'input md login',
        placeholder: 'Password*',
        icon: 'eye-open',
        type: 'password',
    },
    rptPassword: {
        className: 'input md login',
        placeholder: 'Password*',
        icon: 'eye-open',
        type: 'password',
    },
    firstName: {
        className: 'input md login',
        placeholder: 'First name',
    },
    lastName: {
        className: 'input md login',
        placeholder: 'First name',
    }
}