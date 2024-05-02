import React from 'react';
import './create.css';

import Answer from './CreateAnswer';

const Question = (id: number): React.JSX.Element => {
    return (
        <div className="create-input">
            <div>Question {id}</div>
            <input className="create-input-question" type="text" placeholder="Question" />
        </div>
    )
}

const CreateQuestion = () => {
    return (
        <div className="create-question">
            {Question(1)}
            <Answer />
            <div className="create-input">
                <button className="quizz-button-add-answer">Add answer</button>
            </div>
        </div>
    )
}

export default CreateQuestion;