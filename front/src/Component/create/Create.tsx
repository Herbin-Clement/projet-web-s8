import './create.css';

import Header from '../header/Header';
import CreateQuestion from './CreateQuestion';

const Line = () => {
    return (
        <div className="line"/>
    )
}

const Create = () => {
    return (
        <div className="home">
            <Header/>
            <div className="create-content">
                <div className="create-title">
                    <div className="create-input">
                        <div>Quizz title</div>
                        <input type="text" placeholder="Quizz"/>
                    </div>
                </div>
                <Line/>
                <CreateQuestion/>
                <button className="quizz-add-button">Add</button>
            </div>
        </div>
    )
}

export default Create;