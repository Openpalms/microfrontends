import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useLogin } from './hooks/useLogin';

export const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = useLogin();

    const handleLogin = () => {
        login({
            email,
            password
        })
        navigate('/');
    }

    return (
        <>
            <input placeholder="login" value={email} onChange={(e) => setEmail(e.target.value)} />.
            <input placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />.
            <button onClick={handleLogin}>LOGIN</button>
        </>
    )
}
