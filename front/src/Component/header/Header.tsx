import './header.css';

import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header">
            <div className="header-logo">
                <Link to="/home">
                    Q
                </Link>
            </div>
            <div className="header-quizz">
            </div>
            <div className="header-profil">
                <Link to="/join">
                    <div className="header-text">Rejoindre</div>
                </Link>
                <Link to="/create">
                    <div className="header-text">Créer</div>
                </Link>
                <Link to="/myquizz">
                    <div className="header-text">Mes Quizz</div>
                </Link>
                <Link to="/profil">
                    <div className="header-text">Profil</div>
                </Link>
                <div className="header-profil-logo"></div>
            </div>
        </div>
    )
}

export default Header;