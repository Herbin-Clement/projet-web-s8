import React, { useState } from 'react';
import './create.css';

import CreateAnswer from './CreateAnswer';
import Line from '../utils/Line';

type CreateQuestionProps = {
    id: number,
}

interface Answer {
    id: number,
}

const CreateQuestion = ({ id }: CreateQuestionProps) => {

    const [question, setQuestion] = useState<string>("");

    const [answers, setAnswers] = useState<Answer[]>([
        {
            "id": 0
        },
        {
            "id": 1
        }
    ]);

    const updateQuestion = (e: React.FormEvent<HTMLInputElement>): void => {
        setQuestion(e.currentTarget.value);
    }

    const addAnswer = () => {
        const id = answers.length;
        setAnswers([
            ...answers,
            {
                "id": id
            }
        ])
    }

    const removeAnswer = () => {
        if (answers.length > 2) {
            const as = [...answers];
            as.pop();
            setAnswers(as);
        }
    }

    return (
        <div className="create-question">
            <div className="create-input">
                <div>Question {id + 1}</div>
                <input className="create-input-question"
                    type="text"
                    placeholder="Question"
                    value={question}
                    onChange={e => updateQuestion(e)} />
            </div>
            {answers.map(answer => (
                <CreateAnswer key={answer.id} id={answer.id} />
            ))}
            {
                answers.length < 4 &&
                <div className="create-input create-button-answer">
                    <button className="quizz-button-add-question" onClick={() => addAnswer()}>Add answer</button>
                    <button className="quizz-button-remove-question" onClick={() => removeAnswer()}>Remove answer</button>
                </div>
            }
            <Line />
        </div>
    )
}

export default CreateQuestion;