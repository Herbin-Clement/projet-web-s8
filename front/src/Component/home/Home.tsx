import './home.css';

import { Link } from 'react-router-dom';

import Header from '../header/Header';

const Home = () => {
    return (
        <div className="home">
            <Header/>
            <div className="home-content">
                <Link to="/join">
                    <div className="home-button">Join</div>
                </Link>
                <Link to="/create">
                    <div className="home-button">Create</div>
                </Link>
                <Link to="/invite">
                    <div className="home-button">Invite</div>
                </Link>
            </div>
        </div>
    )
}

export default Home;