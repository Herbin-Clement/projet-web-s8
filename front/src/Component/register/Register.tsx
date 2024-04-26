import './register.css';

const Register = ({}) => {

  return (
    <div className="register">
        <div className="form">
            <div className="title">Register</div>
            <div className="entry">
                <div className="name">Username</div>
                <input type="test" placeholder="Username"/>
            </div>
            <div className="entry">
                <div className="name">Password</div>
                <input type="password" placeholder="Password"/>
            </div>
            <button type="button">Register</button>
        </div>
        <div className="toLogin">Vous avez déjà un compte ?</div>
    </div>
  );
}

export default Register;
