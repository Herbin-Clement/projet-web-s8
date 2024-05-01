import './login.css';

import { Link } from 'react-router-dom';

const Login = ({}) => {

  return (
    <div className="login">
        <div className="left">
            
        </div>
        <div className="right">
            <div className="login-form">
                <div className="login-form-title">Login</div>
                <div className="login-form-entry">
                    <div className="name">Username</div>
                    <input type="text" placeholder="Username"/>
                </div>
                <div className="login-form-entry">
                    <div className="name">Password</div>
                    <input type="password" placeholder="Password"/>
                </div>
                <button type="button">Login</button>
            </div>
            <Link to="/register">
                <div className="toRegister">Vous n'avez pas de compte ?</div>
            </Link>
        </div>
    </div>
  );
}

export default Login;
