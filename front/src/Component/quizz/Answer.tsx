import { useState } from 'react';

import './quizz.css';

interface AnswerProps {
    answer: {
        name: string;
        id: number;
        ok: boolean;
    }
}

const Answer = ({ answer }: AnswerProps) => {

    const [isCheck, setIsCheck] = useState<boolean>(false);

    const update = () => {
        setIsCheck(prev => !prev);
        console.log(isCheck);
    }

    return (
        <div className={isCheck ? "quizz-check" : "quizz-notcheck"} onClick={() => update()}>
            {answer.name}
        </div>
    )
}

export default Answer;