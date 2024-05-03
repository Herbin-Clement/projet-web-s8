import React, { useState } from 'react';
import './create.css';

import CreateAnswer from './CreateAnswer';

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
                <div className="create-input">
                    <button className="quizz-button-add-question" onClick={() => addAnswer()}>Add Answer</button>
                </div>
            }
        </div>
    )
}

export default CreateQuestion;