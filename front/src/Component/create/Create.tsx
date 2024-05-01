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
            <div className="createContent">
                <div className="quizzTitle">
                    <div className="quizzInput">
                        <div>Quizz title</div>
                        <input type="text" placeholder="Quizz"/>
                    </div>
                </div>
                <Line/>
                <CreateQuestion/>
                <button className="quizzAddAnswerButton">Add</button>
            </div>
        </div>
    )
}

export default Create;