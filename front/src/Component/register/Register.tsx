import './register.css';

import { Link } from 'react-router-dom';

const Register = ({}) => {

  return (
    <div className="register">
        <div className="register-form">
            <div className="register-form-title">Register</div>
            <div className="register-form-entry">
                <div className="name">Username</div>
                <input type="test" placeholder="Username"/>
            </div>
            <div className="register-form-entry">
                <div className="name">Password</div>
                <input type="password" placeholder="Password"/>
            </div>
            <button type="button">Register</button>
        </div>
        <Link to="/login">
          <div className="toLogin">Vous avez déjà un compte ?</div>
        </Link>
    </div>
  );
}

export default Register;
