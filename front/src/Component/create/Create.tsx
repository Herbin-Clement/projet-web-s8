import React, { useState } from 'react';

import Header from '../header/Header';
import CreateQuestion from './CreateQuestion';
import Line from '../utils/Line';
import './create.css';

interface Question {
    id: number,
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

    const removeQuestion = () => {
        if (questions.length > 1) {
            const qs = [...questions];
            qs.pop();
            setQuestions(qs);
        }
    }

    const submitQuizz = () => {
        console.log("Click on submit !");
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
                        </>
                    ))}
                    <div className="create-input create-button-question">
                        <button className="quizz-button-add-question" onClick={() => addQuestion()}>Add question</button>
                        <button className="quizz-button-remove-question" onClick={() => removeQuestion()}>Remove question</button>
                        <button className="quizz-button-submit" onClick={() => submitQuizz()}>Submit quizz</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Create;