import './login.css';

import { Link } from 'react-router-dom';

const Login = ({}) => {

  return (
    <div className="login">
        <div className="left">
            
        </div>
        <div className="right">
            <div className="form">
                <div className="title">Login</div>
                <div className="entry">
                    <div className="name">Username</div>
                    <input type="test" placeholder="Username"/>
                </div>
                <div className="entry">
                    <div className="name">Password</div>
                    <input type="password" placeholder="Password"/>
                </div>
                <button type="button">Login</button>
            </div>
            <Link to="/register">
                <div className="toRegister">Vous avez déjà un compte ?</div>
            </Link>
        </div>
    </div>
  );
}

export default Login;
