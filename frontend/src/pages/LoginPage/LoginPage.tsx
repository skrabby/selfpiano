import React from 'react';
import * as Components from '../../components';

import './LoginPage.scss';

class LoginPage extends React.Component {
    render() {
        return (
            <div className='wrapper'>
                <div className='card abs-center login'>
                    <div className='logo img'></div>
                    <div className='logo title'>Selfpiano</div>
                    <div className='input-block'>
                        <Components.Input className={'input md login'} placeholder={'Email'} icon={'email'}/>
                        <Components.Input className={'input md login'} placeholder={'Password'} type={'password'} icon={'eye-open'}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage;