import React, { useState } from 'react';

import './create.css';

type CreateAnswerProps = {
    questionId: number,
    responseId: number,
    updateAnswer: (questionId: number, responseId: number, value: string) => void,
    updateCheck: (questionId: number, responseId: number, value: boolean) => void,
}

const CreateAnswer = ({ questionId, responseId, updateAnswer, updateCheck }: CreateAnswerProps) => {

    const [answer, setAnswer] = useState<string>("");

    const [checked, setChecked] = useState<boolean>(false);

    const handleUpdateAnswer = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setAnswer(() => {
            const res = e.target.value;
            updateAnswer(questionId, responseId, res);
            return res;
        }
        );
    }

    const handleUpdateCheck = (): void => {
        setChecked(prev => {
            const res = !prev;
            updateCheck(questionId, responseId, res);
            return res;
        });
    }

    return (
        <div className="create-answer">
            <div className="create-input">
                <div>Réponse {responseId + 1}</div>
                <input type="text"
                    placeholder="Answer"
                    value={answer}
                    onChange={e => handleUpdateAnswer(e)} />
            </div>
            <div className="create-input">
                <div className="create-cb">Vrai</div>
                <input type="checkbox"
                    checked={checked}
                    onChange={() => handleUpdateCheck()} />
            </div>
        </div>
    )
}

export default CreateAnswer;