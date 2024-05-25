import React from 'react';
import './join.css';

interface QuizzListProps {
    names: string[],
    title: string,
    method: string,
    callback: (title: string, method: string) => void;
}

const QuizzListItem = (id: number, quizzName: string, callback: (title: string) => void): React.JSX.Element => {
    return (
        <li key={id} onClick={() => callback(quizzName)}>
            {quizzName}
        </li>
    )
}

const QuizzList = ({ names, title, method, callback }: QuizzListProps) => {

    const handleClick = (title: string): void => {

        callback(title, method);
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