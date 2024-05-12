import { useState } from 'react';
import './quizz.css';

interface AnswerProps {
    id: number,
    selected: boolean | undefined,
    name: string,
    handleAnswerClick: (id: number, value: boolean) => void,
}

const Answer = ({ id, selected, name, handleAnswerClick }: AnswerProps) => {

    const [isSelected, setIsSelected] = useState<boolean>((selected === undefined ? false : selected));

    const handleClick = (): void => {
        setIsSelected(prev => {
            handleAnswerClick(id, !prev);
            return !prev;
        })
    }

    return (
        <div className={isSelected ? "quizz-selected" : "quizz-notselected"} onClick={() => handleClick()}>
            {name}
        </div>
    )
}

export default Answer;