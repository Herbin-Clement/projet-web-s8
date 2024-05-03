import React, { useState } from 'react';

import Header from '../header/Header';
import CreateQuestion from './CreateQuestion';

import './create.css';

interface Question {
    id: number,
}

const Line = () => {
    return (
        <div className="line" />
    )
}

const Create = () => {

    const [questions, setQuestions] = useState<Question[]>([
        {
            "id": 0
        }
    ]);

    const addQuestion = () => {
        const id = questions.length;
        setQuestions([
            ...questions,
            {
                "id": id
            }
        ])
    }

    return (
        <div className="home">
            <Header />
            <div className="create">
                <div className="create-content">
                    <div className="create-title">
                        <div className="create-input">
                            <div>Quizz title</div>
                            <input type="text" placeholder="Quizz" />
                        </div>
                    </div>
                    <Line />
                    {questions.map(question => (
                        <>
                            <CreateQuestion key={question.id} id={question.id} />
                            <Line />
                        </>
                    ))}
                    <div className="create-input test-question">
                        <button className="quizz-button-add-question" onClick={() => addQuestion()}>Add question</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Create;