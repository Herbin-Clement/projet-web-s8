import React from 'react';
import './join.css';

interface QuizzListProps {
    names: string[],
    title: string,
    method: string,
    callback: (id: number, method: string) => void;
}

const QuizzListItem = (id: number, quizzName: string, callback: (id: number) => void): React.JSX.Element => {
    return (
        <li key={id} onClick={() => callback(id)}>
            {quizzName}
        </li>
    )
}

const QuizzList = ({ names, title, method, callback }: QuizzListProps) => {

    const handleClick = (id: number): void => {

        callback(id, method);
    }

    return (
        <div className="quizz-list">
            <div className="quizz-list-title">{title}</div>
            <ul className="quizz-list-content">
                {names.map((quizzName: string, id: number) => {
                    return QuizzListItem(id, quizzName, handleClick);
                })}
            </ul>
        </div>
    )
}

export default QuizzList;