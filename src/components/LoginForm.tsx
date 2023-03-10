import { observer } from 'mobx-react-lite';
import React, {FC, useState, useContext} from 'react';
import {Context} from '../index'

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const {store} = useContext(Context)

    function onButtonClick (func: any) {
        func(email, password)
        setEmail('')
        setPassword('')
    }

    return (
        <div>
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                placeholder="Enter e-mail.."
                type="text"
            />
            <input
                onChange={(e => setPassword(e.target.value))}
                value={password}
                placeholder='Enter password..'
                type="password"
            />
            <button onClick={() => store.login(email, password)}>Login</button>
            <button onClick={() => store.registration(email, password)}>Registration</button>
        </div>
    );
};

export default observer(LoginForm);