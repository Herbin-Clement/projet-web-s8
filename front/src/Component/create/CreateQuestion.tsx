import React, { useState } from 'react';
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
        setQuestion(() => {
            const res = e.target.value;
            updateQuestion(questionId, res, nbAnswer);
            return res;
        }
        );
    }

    const handleAddAnswer = () => {
        setNbAnswer(prev => {
            let next = 0;
            if (prev < 4) {
                next = prev + 1;
                addAnswer(questionId, next);
            } else {
                next = prev;
            }
            return next;
        })
    }

    const handleRemoveAnswer = () => {
        setNbAnswer(prev => {
            let next = 0;
            if (prev > 2) {
                next = prev - 1;
                addAnswer(questionId, next);
            } else {
                next = prev;
            }
            return next;
        })
    }

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
                {nbAnswer < 4 && <button className="quizz-button-add-question" onClick={() => handleAddAnswer()}>Add answer</button>}
                {nbAnswer > 2 && <button className="quizz-button-remove-question" onClick={() => handleRemoveAnswer()}>Remove answer</button>}
            </div>
            <Line />
        </div>
    )
}

export default CreateQuestion;