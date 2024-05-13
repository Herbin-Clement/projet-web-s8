import React, { useEffect, useState } from 'react';

import Header from '../header/Header';
import CreateQuestion from './CreateQuestion';
import Line from '../utils/Line';
import './create.css';

import { QuizzData } from '../../Type/interface';


const checkQuizzData = (data: QuizzData): boolean => {
    if (data.title.trim() === "") return false;
    for (let q = 0; q < data.questions.length; q++) {
        if (data.questions[q].question.trim() === "") return false;
        for (let a = 0; a < data.questions[q].answers.length; a++) {
            if (data.questions[q].answers[a].text.trim() === "") return false;
        }
    }
    return true;
}

const Create = () => {

    const [title, setTitle] = useState<string>("");
    const [nbQuestion, setNbQuestion] = useState<number>(1);
    const [quizz, setQuizz] = useState<QuizzData>(
        {
            title: "",
            questions: [
                {
                    question: "",
                    id: 0,
                    answers: [
                        {
                            text: "",
                            id: 0,
                            ok: false,
                        },
                        {
                            text: "",
                            id: 1,
                            ok: false,
                        }
                    ],
                },
            ],
        }
    )

    const addQuestion = () => {
        setNbQuestion(prevNbQuestion => prevNbQuestion < 10 ? prevNbQuestion + 1 : prevNbQuestion);
    }

    const removeQuestion = () => {
        setNbQuestion(prevNbQuestion => prevNbQuestion > 1 ? prevNbQuestion - 1 : prevNbQuestion);
    }

    const submitQuizz = () => {
        console.log(quizz);
        console.log(`check: ${checkQuizzData(quizz)}`);
    }

    const updateQuestion = (questionId: number, value: string): void => {
        if (questionId !== quizz.questions.length) {
            setQuizz(prevQuizz => {
                const nextQuizz = { ...prevQuizz };
                nextQuizz.questions[questionId].question = value;
                return nextQuizz;
            })
        }
    }

    const addAnswer = (questionId: number, next: number): void => {
        if (questionId !== quizz.questions.length) {
            setQuizz(prevQuizz => {
                const nextQuizz = { ...prevQuizz };
                const prev = nextQuizz.questions[questionId].answers.length;
                if (prev > next) {
                    nextQuizz.questions[questionId].answers.pop();
                } else if (next > prev) {
                    nextQuizz.questions[questionId].answers.push({
                        text: "",
                        id: next - 1,
                        ok: false,
                    });
                }
                return nextQuizz;
            })
        }
    }

    const updateAnswer = (questionId: number, responseId: number, value: string): void => {
        setQuizz(prevQuizz => {
            const nextQuizz = { ...prevQuizz };
            nextQuizz.questions[questionId].answers[responseId].text = value;
            return nextQuizz;
        })
    }
    const updateCheck = (questionId: number, responseId: number, value: boolean): void => {
        setQuizz(prevQuizz => {
            const nextQuizz = { ...prevQuizz };
            nextQuizz.questions[questionId].answers[responseId].ok = value;
            return nextQuizz;
        })
    }

    const handleUpdateTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setTitle(e.target.value);
    }

    useEffect(() => {
        setQuizz(prevQuizz => {
            const nextQuizz = { ...prevQuizz };
            const currentNbQuestion = nextQuizz.questions.length;
            if (currentNbQuestion < nbQuestion) {
                nextQuizz.questions.push({
                    question: "",
                    id: nbQuestion - 1,
                    answers: [
                        {
                            text: "",
                            id: 0,
                            ok: false,
                        },
                        {
                            text: "",
                            id: 1,
                            ok: false,
                        }
                    ],
                })
            } else if (currentNbQuestion > nbQuestion) {
                nextQuizz.questions.pop();
            }
            return nextQuizz;
        })
    }, [nbQuestion]);

    useEffect(() => {
        setQuizz(prevQuizz => {
            const nextQuizz = { ...prevQuizz };
            nextQuizz.title = title;
            return nextQuizz;
        })
    }, [title]);

    return (
        <div className="home">
            <Header />
            <div className="create">
                <div className="create-content">
                    <div className="create-title">
                        <div className="create-input">
                            <div>Quizz title</div>
                            <input type="text" placeholder="Quizz" value={title} onChange={e => handleUpdateTitle(e)} />
                        </div>
                    </div>
                    <Line />
                    {[...Array(nbQuestion)].map((_, id) => (
                        <CreateQuestion key={id}
                            questionId={id}
                            updateAnswer={updateAnswer}
                            updateQuestion={updateQuestion}
                            updateCheck={updateCheck}
                            addAnswer={addAnswer} />
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