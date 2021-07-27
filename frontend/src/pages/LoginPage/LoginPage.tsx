import React, {BaseSyntheticEvent } from 'react';
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
    statusMsg: string;

    formLastKey: number;
}

class LoginPage extends React.Component<LoginPageState> {

    state = {
        card: Card.LOGIN,
        statusMsgType: Message.NONE,
        statusMsg: '',
        formLastKey: 0
    }

    onRegisterClick = () => {
        this.setState( (state: any) => ({
            card: Card.REGISTER,
            formLastKey: state.formLastKey + 1
        }));
    }

    onLoginClick = () => {
        this.setState( (state: any) => ({
            card: Card.LOGIN,
            formLastKey: state.formLastKey + 1
        }));
    }

    onForgotPasswordClick = () => {
        this.setState( (state: any) => ({
            card: Card.FORGOT_PASSWORD,
            formLastKey: state.formLastKey + 1
        }));
    }

    onLoginSubmit = (e: BaseSyntheticEvent) => {
        for (let key of Object.keys(fields)) {
            fields[key].isChanged = true;
        }
        this.setState((state: any) => ({
            formLastKey: state.formLastKey + 1
        }));

        if (!Rules.validInputCheck(
            // getting only login fields
            (({ login, password }) => ({ login, password }))(fields))
        ) {
            return ;
        }

        const data: Actions.Interfaces.ILoginSubmitData = {
            login: fields.login.value,
            password: fields.password.value
        }

        Actions.SubmitActions.submitLogin(data)
    }

    onForgotPasswordSubmit = (e: BaseSyntheticEvent) => {
        for (let key of Object.keys(fields)) {
            fields[key].isChanged = true;
        }
        this.setState((state: any) => ({
            formLastKey: state.formLastKey + 1
        }));

        if (!Rules.validInputCheck(
            // getting only login fields
            (({ login, password }) => ({ login, password }))(fields))
        ) {
            return ;
        }

        const data: Actions.Interfaces.IForgotPasswordSubmitData = {
            login: fields.login.value,
        }

        //Actions.SubmitActions.submitLogin(data)
    }

    onRegisterSubmit = (e: BaseSyntheticEvent) => {
        for (let key of Object.keys(fields)) {
            fields[key].isChanged = true;
        }
        this.setState((state: any) => ({
            formLastKey: state.formLastKey + 1
        }));

        if (!Rules.validInputCheck(
            // getting only login fields
            (({ login, password }) => ({ login, password }))(fields))
        ) {
            return ;
        }

        const data: Actions.Interfaces.IRegisterSubmitData = {
            login: fields.login.value,
            password: fields.password.value
        }

        //Actions.SubmitActions.submitLogin(data)
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

    renderForm() {
        const { card, formLastKey } = this.state;

        switch(card) {

            case Card.LOGIN:
                return <React.Fragment>
                        <div className='input-block'>
                            <div className={'status-msg ' + this.getMsgColor()}>
                                {this.state.statusMsgType !== Message.NONE && this.state.statusMsg}
                            </div>
                            <Components.Form
                                key={formLastKey}
                                onSubmit={this.onLoginSubmit}>
                                <Components.Input {...fields.login} />
                                <Components.Input {...fields.password} />
                                <div className='social-auth-block'>
                                    <div className='social-icon facebook'></div>
                                    <div className='social-icon google'></div>
                                    <div className='social-icon twitter'></div>
                                </div>
                                <div className='btn-submit-block'>
                                    <Components.Button type="submit" className='btn btn-primary center'>Login</Components.Button>
                                </div>
                            </Components.Form>
                        </div>

                    <div className='password-reminder'>
                        <span className="link-text" onClick={() => this.onForgotPasswordClick()}>Forgot your password?</span>
                    </div>
                    <div className='register-text'>No account yet? <span onClick={() => this.onRegisterClick()} className='link-text'>Register</span></div>
                </React.Fragment>


            case Card.REGISTER:
                return (
                    <React.Fragment>
                        <div className='input-block'>
                            <div className={'status-msg ' + this.getMsgColor()}>
                                {this.state.statusMsgType !== Message.NONE && this.state.statusMsg}
                            </div>
                            <Components.Form
                                key={formLastKey}
                                onSubmit={this.onRegisterSubmit}>
                                <Components.Input {...fields.login}/>
                                <Components.Input {...fields.firstName} />
                                <Components.Input {...fields.lastName} />
                                <Components.Input {...fields.regPassword} />
                                <Components.Input {...fields.regRptPassword} />
                                <div className='social-auth-block'>
                                    <div className='social-icon facebook'></div>
                                    <div className='social-icon google'></div>
                                    <div className='social-icon twitter'></div>
                                </div>
                                <div className='btn-submit-block'>
                                    <Components.Button type="submit" className='btn btn-primary center'>Register</Components.Button>
                                </div>
                            </Components.Form>
                        </div>

                    <div className='password-reminder'>
                        <span className="link-text" onClick={() => this.onForgotPasswordClick()}>Forgot your password?</span>
                    </div>
                    <div className='register-text'>Already have an account? <span onClick={() => this.onLoginClick()} className='link-text'>Login</span></div>
                </React.Fragment>
            );

            case Card.FORGOT_PASSWORD:
                return (
                    <React.Fragment>
                        <div className='input-block'>
                            <div className={'status-msg ' + this.getMsgColor()}>
                                {this.state.statusMsgType !== Message.NONE && this.state.statusMsg}
                            </div>
                            <Components.Form
                                key={formLastKey}
                                onSubmit={this.onForgotPasswordSubmit}>
                                <Components.Input {...fields.login} />
                                <div className='btn-submit-block'>
                                    <Components.Button type="submit" className='btn btn-primary center'>Submit</Components.Button>
                                </div>
                            </Components.Form>
                        </div>
                    <div className='register-text'>Want to login again? <span onClick={() => this.onLoginClick()} className='link-text'>Login</span></div>
                    <div className='register-text'>No account yet? <span onClick={() => this.onRegisterClick()} className='link-text'>Register</span></div>
                </React.Fragment>
                );
        }

    }

    render() {
        return (
            <div className='wrapper-pic'>
                <div className='card abs-center login'>
                    <div className='logo img'></div>
                    <div className='logo title'>Selfpiano</div>
                    {this.renderForm()}
                </div>
            </div>
        )
    }
}

export default LoginPage;

const fields: any = {
    login: {
        id: 'login',
        className: 'input md login',
        placeholder: 'Email*',
        icon: 'email',
        rules: [{ rule: Rules.isRequired }],
        onChange: (e: any) => fields.login.value = e.value
    },
    password: {
        id: 'password',
        className: 'input md login',
        placeholder: 'Password*',
        icon: 'eye-open',
        type: 'password',
        rules: [{ rule: Rules.isRequired }],
        onChange: (e: any) => fields.password.value = e.value
    },
    regPassword: {
        id: 'regPassword',
        className: 'input md login',
        placeholder: 'Password*',
        icon: 'eye-open',
        type: 'password',
        rules: [{ rule: Rules.hasCapLetter }, { rule: Rules.hasDigit }, { rule: Rules.minLength, args: { minLength: 6 } }],
        onChange: (e: any) => fields.regPassword.value = e.value
    },
    regRptPassword: {
        id: 'regRptPassword',
        className: 'input md login',
        placeholder: 'Repeat password*',
        icon: 'eye-open',
        type: 'password',
        rules: [{ rule: Rules.hasCapLetter }, { rule: Rules.hasDigit }, { rule: Rules.minLength, args: { minLength: 6 } }],
        onChange: (e: any) => fields.regRptPassword.value = e.value
    },
    firstName: {
        id: 'firstName',
        className: 'input md login',
        placeholder: 'First name',
        onChange: (e: any) => fields.firstName.value = e.value
    },
    lastName: {
        id: 'lastName',
        className: 'input md login',
        placeholder: 'Last name',
        onChange: (e: any) => fields.lastName.value = e.value
    }
}