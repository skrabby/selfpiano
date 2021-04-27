import React, {BaseSyntheticEvent, SyntheticEvent} from 'react';
import * as Components from '../../components';
import * as Actions from './actions';
import { Message } from '../../utils/enums';
import * as Rules from '../../utils/rules';


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
        statusMsg: '',
        fields: fields
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

    onFormSubmit = (e: BaseSyntheticEvent) => {
        e.preventDefault();
        if (!Rules.validInputCheck(e, fields)) {
            return ;
        }

        const data: Actions.Interfaces.ILoginSubmitAction = {
            login: e.target.login.value,
            password: e.target.password.value
        }

        Actions.SubmitActions.submitLogin(data)
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
                            <Components.Input {...fields.regPassword} />
                            <Components.Input {...fields.regRptPassword} />
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
                return <Components.Button type="submit" className='btn btn-primary center'>Login</Components.Button>
            case Card.REGISTER:
                return <Components.Button type="submit" className='btn btn-primary center'>Register</Components.Button>
            case Card.FORGOT_PASSWORD:
                return <Components.Button type="submit" className='btn btn-primary center'>Submit</Components.Button>
        }
    }

    render() {

        return (
            <div className='wrapper-pic'>
                <div className='card abs-center login'>
                    <div className='logo img'></div>
                    <div className='logo title'>Selfpiano</div>
                    <form onSubmit={this.onFormSubmit}>
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
                    </form>
                    {this.state.card === Card.LOGIN ?
                        <div className='password-reminder'>
                            <span className="link-text" onClick={() => this.onForgotPasswordClick()}>Forgot your password?</span>
                        </div>
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

const fields: any = {
    login: {
        name: 'login',
        className: 'input md login',
        placeholder: 'Email*',
        icon: 'email',
        rules: [{ rule: Rules.isRequired }]
    },
    password: {
        name: 'password',
        className: 'input md login',
        placeholder: 'Password*',
        icon: 'eye-open',
        type: 'password',
        rules: [{ rule: Rules.isRequired }]
    },
    regPassword: {
        name: 'regPassword',
        className: 'input md login',
        placeholder: 'Password*',
        icon: 'eye-open',
        type: 'password',
        rules: [{ rule: Rules.hasCapLetter }, { rule: Rules.hasDigit }, { rule: Rules.minLength, args: { minLength: 6 } }]
    },
    regRptPassword: {
        name: 'regRptPassword',
        className: 'input md login',
        placeholder: 'Repeat password*',
        icon: 'eye-open',
        type: 'password',
        rules: [{ rule: Rules.hasCapLetter }, { rule: Rules.hasDigit }, { rule: Rules.minLength, args: { minLength: 6 } }]
    },
    firstName: {
        name: 'firstName',
        className: 'input md login',
        placeholder: 'First name',
    },
    lastName: {
        name: 'lastName',
        className: 'input md login',
        placeholder: 'Last name'
    }
}