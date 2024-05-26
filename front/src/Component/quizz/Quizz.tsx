import './quizz.css';

import Header from '../header/Header';
import Answer from './Answer';
import { useEffect, useState } from 'react';

import { QuizzData, AnswerData, AnswerResponse, QuestionResponse } from '../../Type/interface';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Hooks/useAuth';

interface QuizzProps {
    title: string,
}

const AnswerToAnswerResponse = (ans: AnswerData): AnswerResponse => {
    return {
        id: ans.id,
        res: false,
    }
}

const Quizz = ({ title }: QuizzProps) => {

    const [questionId, setQuestionId] = useState<number>(0);
    const [answers, setAnswers] = useState<QuestionResponse[]>([]);
    const [currentAnswers, setCurrentAnswers] = useState<AnswerResponse[]>([]);
    const [quizz, setQuizz] = useState<QuizzData | undefined>(undefined);
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleClick = async () => {
        if (quizz === undefined) {
            return
        }
        setAnswers(prev => {
            prev.push({
                id: quizz.questions[questionId].id,
                answers: currentAnswers,
            });
            return prev;
        })
        if (questionId + 1 === quizz.questions.length) {
            const response = await fetch("http://localhost:8080/server/servlet/?op=addAnsQuizz", {
                method: "POST",
                body: JSON.stringify({
                    title: title,
                    username: user,
                    questions: answers,
                }),
            });
            console.log(JSON.stringify({
                title: title,
                username: user,
                questions: answers,
            }))
            const data = await response.json();
            console.log(data);
            if (data.status === "ok") {
                navigate("/home");
            }
        } else {
            setQuestionId(prev => {
                const res = prev + 1;
                setCurrentAnswers(quizz.questions[res].answers.map(ans => AnswerToAnswerResponse(ans)));
                return res
            });
        }
    }

    const handleAnswerClick = (id: number, value: boolean) => {
        setCurrentAnswers(prev => {
            for (let i = 0; i < prev.length; i++) {
                if (prev[i].id === id) {
                    prev[i].res = value;
                    break;
                }
            }
            return prev;
        })
    }

    useEffect(() => {
        if (title === "") {
            return
        }
        const getQuizz = async () => {
            const response = await fetch("http://localhost:8080/server/servlet/?op=joinQuizzLink", {
                method: "POST",
                body: JSON.stringify({
                    title: title,
                }),
            });
            const data = await response.json();
            const q: QuizzData = data.quizzData;
            setQuizz(q);
            setCurrentAnswers(() => {
                const next = q.questions[questionId].answers.map(ans => AnswerToAnswerResponse(ans));
                return next;
            })
        }
        getQuizz();
    }, [title]);

    return (
        <div className="home">
            <Header />
            <div className="quizz-content">
                <div className="quizz-question">
                    <div className="quizz-title">
                        {quizz !== undefined ? quizz.title : ""}
                    </div>
                    <div className="quizz-question-name">
                        {quizz !== undefined ? quizz.questions[questionId].question : ""}
                    </div>
                    <div className="quizz-question-answers">
                        {
                            quizz !== undefined ? quizz.questions[questionId].answers.map((answer, id) =>
                                <Answer key={answer.id}
                                    id={answer.id}
                                    name={answer.text}
                                    handleAnswerClick={handleAnswerClick}
                                    selected={currentAnswers[id].res} />
                            ) : []
                        }
                    </div>
                </div>
                <div className="quizz-next">
                    <button className="quizz-button-add-question"
                        onClick={() => handleClick()}>
                        {quizz !== undefined ? questionId + 1 === quizz.questions.length ? "Finish" : "Next question" : ""}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Quizz;