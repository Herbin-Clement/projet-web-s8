import './header.css';

const Header = () => {
    return (
        <div className="header">
            <div className="headerlogo">
                Q
            </div>
            <div className="headerquizz">
                <div className="headertext">Join quizz</div>
                <div className="headertext">Create quizz</div>
                <div className="headertext">My quizz</div>
            </div>
            <div className="headerprofil">
                <div className="headertext">Profil</div>
                <div className="headerprofillogo"></div>
            </div>
        </div>
    )
}

export default Header;