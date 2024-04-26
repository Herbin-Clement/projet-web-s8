import './home.css';

import Header from '../header/Header';

const Home = () => {
    return (
        <div className="home">
            <Header/>
            <div className="homecontent">
                <div>Join</div>
                <div>Create</div>
                <div>Invite</div>
            </div>
        </div>
    )
}

export default Home;