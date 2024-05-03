import React, { useState } from 'react';

import './create.css';

type CreateAnswerProps = {
    id: number,
}

const CreateAnswer = ({ id }: CreateAnswerProps) => {

    const [answer, setAnswer] = useState<string>("");

    const [checked, setChecked] = useState<boolean>(false);

    const updateAnswer = (e: React.FormEvent<HTMLInputElement>): void => {
        setAnswer(e.currentTarget.value);
    }

    const updateChecked = (): void => {
        setChecked(!checked);
    }

    return (
        <div className="create-answer">
            <div className="create-input">
                <div>Answer {id + 1}</div>
                <input type="text"
                    placeholder="Answer"
                    value={answer}
                    onChange={e => updateAnswer(e)} />
            </div>
            <div className="create-input">
                <div className="create-cb">True</div>
                <input type="checkbox"
                    checked={checked}
                    onChange={() => updateChecked()} />
            </div>
        </div>
    )
}

export default CreateAnswer;