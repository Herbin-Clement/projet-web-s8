import React from 'react';
import './join.css';

interface QuizzListProps {
    names: string[],
    title: string,
}

const QuizzListItem = (id: number, quizzName: string): React.JSX.Element => {
    return (
        <li key={id}>
            {quizzName}
        </li>
    )
}

const QuizzList = ({ names, title }: QuizzListProps) => {

    return (
        <div className="quizz-list">
            <div className="quizz-list-title">{title}</div>
            <ul className="quizz-list-content">
                {names.map((quizzName: string, id: number) => {
                    return QuizzListItem(id, quizzName)
                })}
            </ul>
        </div>
    )
}

export default QuizzList;