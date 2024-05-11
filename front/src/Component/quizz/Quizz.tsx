import './quizz.css';

import Header from '../header/Header';
import Answer from './Answer';

const quizz = {
    "name": "Premier quizz",
    "questions": [
        {
            "name": "Suis-je la question 1 ?",
            "id": 10,
            "answers": [
                {
                    "name": "Oui",
                    "id": 50,
                    "ok": true,
                },
                {
                    "name": "Non",
                    "id": 51,
                    "ok": false,
                },
                {
                    "name": "Peut-être",
                    "id": 49,
                    "ok": false,
                }
            ]
        },
        {
            "name": "Suis-je la question 2 ?",
            "id": 10,
            "answers": [
                {
                    "name": "Non",
                    "id": 52,
                    "ok": false,
                },
                {
                    "name": "Oui",
                    "id": 53,
                    "ok": true,
                }
            ]
        },
        {
            "name": "Suis-je la question 4 ?",
            "id": 10,
            "answers": [
                {
                    "name": "Non",
                    "id": 52,
                    "ok": true,
                },
                {
                    "name": "Oui",
                    "id": 53,
                    "ok": false,
                }
            ]
        }
    ]
}

const Quizz = () => {
    return (
        <div className="home">
            <Header />
            <div className="quizz-content">
                <div className="quizz-question">
                    <div className="quizz-title">
                        {quizz.name}
                    </div>
                    <div className="quizz-question-name">
                        {quizz.questions[0].name}
                    </div>
                    <div className="quizz-question-answers">
                        {
                            quizz.questions[0].answers.map(answer =>
                                <Answer key={answer.id} answer={answer} />
                            )
                        }
                    </div>
                </div>
                <div className="quizz-next">
                    <button className="quizz-button-add-question">Next question</button>
                </div>
            </div>
        </div>
    )
}

export default Quizz;