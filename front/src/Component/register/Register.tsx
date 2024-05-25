import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './register.css';
import { useAuth } from '../../Hooks/useAuth';

const Register = () => {

  const [username, setUsername] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const { register } = useAuth();

  const updateUsername = (e: React.FormEvent<HTMLInputElement>): void => {
    setUsername(e.currentTarget.value);
  }

  const updatePwd = (e: React.FormEvent<HTMLInputElement>): void => {
    setPwd(e.currentTarget.value);
  }

  const handleClick = async () => {
    if (username !== "" && pwd !== "") {
      const res = await register(username, pwd);
      setMessage(res);
    }
  }

  return (
    <div className="register">
      <div className="register-form">
        <div className="register-form-title">Register</div>
        <div className="register-form-entry">
          <div className="message">{message}</div>
          <div className="name">Username</div>
          <input type="test" placeholder="Username" value={username} onChange={e => updateUsername(e)} />
        </div>
        <div className="register-form-entry">
          <div className="name">Password</div>
          <input type="password" placeholder="Password" value={pwd} onChange={e => updatePwd(e)} />
        </div>
        <button type="button" onClick={() => handleClick()}>Register</button>
      </div>
      <Link to="/login">
        <div className="toLogin">Vous avez déjà un compte ?</div>
      </Link>
    </div>
  );
}

export default Register;
