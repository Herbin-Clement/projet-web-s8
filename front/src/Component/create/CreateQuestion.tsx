import React, { useEffect, useState } from 'react';
import './create.css';

import CreateAnswer from './CreateAnswer';
import Line from '../utils/Line';

type CreateQuestionProps = {
    questionId: number,
    updateQuestion: (questionId: number, value: string, nbAnswer: number) => void,
    updateAnswer: (questionId: number, responseId: number, value: string) => void,
    updateCheck: (questionId: number, responseId: number, value: boolean) => void,
    addAnswer: (questionId: number, n: number) => void,
}

const CreateQuestion = ({ questionId, updateQuestion, updateAnswer, updateCheck, addAnswer }: CreateQuestionProps) => {

    const [question, setQuestion] = useState<string>("");

    const [nbAnswer, setNbAnswer] = useState<number>(2);

    const handleUpdateQuestion = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setQuestion(e.target.value);
    }

    const handleAddAnswer = () => {
        setNbAnswer(prev => prev < 4 ? prev + 1 : prev);
    }

    const handleRemoveAnswer = () => {
        setNbAnswer(prev => prev > 2 ? prev - 1 : prev);
    }

    useEffect(() => {
        addAnswer(questionId, nbAnswer);
    }, [nbAnswer])

    useEffect(() => {
        updateQuestion(questionId, question, nbAnswer);
    }, [question])

    return (
        <div className="create-question">
            <div className="create-input">
                <div>Question {questionId + 1}</div>
                <input className="create-input-question"
                    type="text"
                    placeholder="Question"
                    value={question}
                    onChange={e => handleUpdateQuestion(e)} />
            </div>
            {[...Array(nbAnswer)].map((_, id) => (
                <CreateAnswer key={id}
                    questionId={questionId}
                    responseId={id}
                    updateAnswer={updateAnswer}
                    updateCheck={updateCheck} />
            ))}
            <div className="create-input create-button-answer">
                {nbAnswer < 4 && <button className="quizz-button-add-question" onClick={() => handleAddAnswer()}>Ajouter</button>}
                {nbAnswer > 2 && <button className="quizz-button-remove-question" onClick={() => handleRemoveAnswer()}>Retirer</button>}
            </div>
            <Line />
        </div>
    )
}

export default CreateQuestion;