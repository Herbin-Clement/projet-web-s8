import { useState } from "react";

import QuizzList from "../join/QuizzList";
import { quizz, quizzreview } from "../../App";
import Header from "../header/Header";
import ReviewCreated from "./created/ReviewCreated";
import ReviewAnswered from "./answered/ReviewAnswered";

import './myquizz.css';

const mockCreated = ["Quizz 1", "Quizz 2", "Quizz 3"];

const mockAnswered = ["Quizz 4", "Quizz 5", "Quizz 6"];

const MyQuizz = () => {

    const handleListClick = (id: number, method: string): void => {
        console.log(id, method);
    }

    return (
        <div className="home">
            <Header />
            <div className="myquizz-content">
                <div className="myquizz-created">
                    <QuizzList names={mockCreated} method="created" title="Quizz Created" callback={handleListClick} />
                </div>
                <div className="myquizz-answered">
                    <QuizzList names={mockAnswered} method="answered" title="Quizz Answered" callback={handleListClick} />
                </div>
            </div>
            {/* <ReviewCreated data={quizz} /> */}
            {/* <ReviewAnswered data={quizzreview} /> */}
        </div>
    )
};

export default MyQuizz