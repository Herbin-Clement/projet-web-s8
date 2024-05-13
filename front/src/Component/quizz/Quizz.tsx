import './quizz.css';

import Header from '../header/Header';
import Answer from './Answer';
import { useState } from 'react';

import { QuizzData, AnswerData, AnswerResponse, QuestionResponse } from '../../Type/interface';

interface QuizzProps {
    data: QuizzData,
}

const AnswerToAnswerResponse = (ans: AnswerData): AnswerResponse => {
    return {
        id: ans.id,
        res: false,
    }
}

const Quizz = ({ data }: QuizzProps) => {

    const [questionId, setQuestionId] = useState<number>(0);
    const [answers, setAnswers] = useState<QuestionResponse[]>([]);
    const [currentAnswers, setCurrentAnswers] = useState<AnswerResponse[]>(data.questions[questionId].answers.map(ans => AnswerToAnswerResponse(ans)));

    const handleClick = () => {
        setAnswers(prev => {
            prev.push({
                id: data.questions[questionId].id,
                answers: currentAnswers,
            });
            return prev;
        })
        if (questionId + 1 === data.questions.length) {
            console.log("Quizz finished");
            console.log(answers);
        } else {
            setQuestionId(prev => {
                const res = prev + 1;
                setCurrentAnswers(data.questions[res].answers.map(ans => AnswerToAnswerResponse(ans)));
                return res
            });
        }
    }

    const handleAnswerClick = (id: number, value: boolean) => {
        console.log("yo");
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

    return (
        <div className="home">
            <Header />
            <div className="quizz-content">
                <div className="quizz-question">
                    <div className="quizz-title">
                        {data.title}
                    </div>
                    <div className="quizz-question-name">
                        {data.questions[questionId].question}
                    </div>
                    <div className="quizz-question-answers">
                        {
                            data.questions[questionId].answers.map((answer, id) =>
                                <Answer key={answer.id}
                                    id={answer.id}
                                    name={answer.text}
                                    handleAnswerClick={handleAnswerClick}
                                    selected={currentAnswers[id].res} />
                            )
                        }
                    </div>
                </div>
                <div className="quizz-next">
                    <button className="quizz-button-add-question"
                        onClick={() => handleClick()}>
                        {questionId + 1 === data.questions.length ? "Finish" : "Next question"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Quizz;