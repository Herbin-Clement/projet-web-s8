import './home.css';

import { Link } from 'react-router-dom';

import Header from '../header/Header';

const Home = () => {
    return (
        <div className="home">
            <Header />
            <div className="home-content">
                <Link to="/join">
                    <div className="home-button">Rejoindre</div>
                </Link>
                <Link to="/create">
                    <div className="home-button">Créer</div>
                </Link>
            </div>
        </div>
    )
}

export default Home;