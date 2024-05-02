import React from 'react';
import './join.css';

const QuizzListItem = (id: number, quizzName: string): React.JSX.Element => {
    return (
        <li key={id}>
            {quizzName}
        </li>
    )
}

const QuizzList = () => {

    const mockNames = ["Quizz 1", "Quizz 2", "Quizz 3"];

    return (
        <div className="quizz-list">
            <div className="quizz-list-title">Quizz List</div>
            <ul className="quizz-list-content">
                {mockNames.map((quizzName: string, id: number) => {
                    return QuizzListItem(id, quizzName)
                })}
            </ul>
        </div>
    )
}

export default QuizzList;