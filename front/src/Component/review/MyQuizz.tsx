
import Header from "../header/Header";
import QuizzList from "../join/QuizzList";

import './myquizz.css';

const MyQuizz = () => {

    const mockCreated = ["Quizz 1", "Quizz 2", "Quizz 3"];

    const mockAnswered = ["Quizz 4", "Quizz 5", "Quizz 6"];

    return (
        <div className="home">
            <Header />
            <div className="myquizz-content">
                <div className="myquizz-created">
                    <QuizzList names={mockCreated} title="Quizz Created" />
                </div>
                <div className="myquizz-answered">
                    <QuizzList names={mockAnswered} title="Quizz Answered" />
                </div>
            </div>
        </div>
    )
};

export default MyQuizz