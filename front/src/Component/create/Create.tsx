import React, { useEffect, useState } from 'react';

import Header from '../header/Header';
import CreateQuestion from './CreateQuestion';
import Line from '../utils/Line';
import './create.css';

import { QuizzData } from '../quizz/Quizz';

const newAnswer = [
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
]

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
                    answers: newAnswer,
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

    useEffect(() => {
        setQuizz(prevQuizz => {
            const nextQuizz = { ...prevQuizz };
            const currentNbQuestion = nextQuizz.questions.length;
            if (currentNbQuestion < nbQuestion) {
                nextQuizz.questions.push({
                    question: "",
                    id: nbQuestion - 1,
                    answers: newAnswer,
                })
            } else if (currentNbQuestion > nbQuestion) {
                nextQuizz.questions.pop();
            }
            return nextQuizz;
        })
    }, [nbQuestion]);


    const submitQuizz = () => {
        console.log(quizz);
    }

    const updateQuestion = (questionId: number, value: string): void => {
        setQuizz(prevQuizz => {
            const nextQuizz = { ...prevQuizz };
            nextQuizz.questions[questionId].question = value;
            return nextQuizz;
        })
    }

    const addAnswer = (questionId: number, next: number): void => {
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
        setTitle(() => {
            const res = e.target.value;
            console.log(res);
            setQuizz(prevQuizz => {
                const nextQuizz = { ...prevQuizz };
                nextQuizz.title = res;
                return nextQuizz;
            })
            return res;
        }
        );
    }

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
                        <>
                            <CreateQuestion key={id}
                                questionId={id}
                                updateAnswer={updateAnswer}
                                updateQuestion={updateQuestion}
                                updateCheck={updateCheck}
                                addAnswer={addAnswer} />
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