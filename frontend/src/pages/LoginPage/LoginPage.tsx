import React from 'react';
import * as Components from '../../components';
import { Message } from '../../utils/enums';

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
                            <Components.Input className={'input md login'} placeholder={'Email*'} icon={'email'}/>
                            <Components.Input className={'input md login'} placeholder={'First name'} />
                            <Components.Input className={'input md login'} placeholder={'Last name'} />
                            <Components.Input className={'input md login'} placeholder={'Password*'} icon={'eye-open'} type={'password'}/>
                            <Components.Input className={'input md login'} placeholder={'Repeat password*'} icon={'eye-open'} type={'password'}/>
                        </div>
            case Card.LOGIN:
                return  <div>
                            <Components.Input className={'input md login'} placeholder={'Email*'} icon={'email'} />
                            <Components.Input className={'input md login'} placeholder={'Password*'} icon={'eye-open'} type={'password'} />
                        </div>
            case Card.FORGOT_PASSWORD:
                return  <div>
                            <Components.Input className={'input md login'} placeholder={'Email*'} icon={'email'}/>
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