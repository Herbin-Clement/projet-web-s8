import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './login.css';

const Login = () => {

    const [username, setUsername] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");

    const updateUsername = (e: React.FormEvent<HTMLInputElement>): void => {
        setUsername(e.currentTarget.value);
    }

    const updatePwd = (e: React.FormEvent<HTMLInputElement>): void => {
        setPwd(e.currentTarget.value);
    }

    const handleClick = (): void => {
        if (username !== "" && pwd !== "") {
            console.log("Click !");
        }
    }

    return (
        <div className="login">
            <div className="login-left">

            </div>
            <div className="login-right">
                <div className="login-form">
                    <div className="login-form-title">Login</div>
                    <div className="login-form-entry">
                        <div className="name">Username</div>
                        <input type="text" placeholder="Username" value={username} onChange={e => updateUsername(e)} />
                    </div>
                    <div className="login-form-entry">
                        <div className="name">Password</div>
                        <input type="password" placeholder="Password" value={pwd} onChange={e => updatePwd(e)} />
                    </div>
                    <button type="button" onClick={() => handleClick()}>Login</button>
                </div>
                <Link to="/register">
                    <div className="toRegister">Vous n'avez pas de compte ?</div>
                </Link>
            </div>
        </div>
    );
}

export default Login;
