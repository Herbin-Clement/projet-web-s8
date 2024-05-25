import { useEffect, useState } from "react";

import QuizzList from "../join/QuizzList";
import { quizz, quizzreview } from "../../App";
import Header from "../header/Header";
import ReviewCreated from "./created/ReviewCreated";
import ReviewAnswered from "./answered/ReviewAnswered";

import './myquizz.css';
import { useAuth } from "../../Hooks/useAuth";

const MyQuizz = () => {

    const [mod, setMod] = useState<string>("list");
    const [quizzListCreated, setQuizzListCreated] = useState<string[]>([]);
    const [quizzListAnswered, setQuizzListAnswered] = useState<string[]>([]);
    const { user } = useAuth();

    const handleListClick = async (title: string, method: string) => {
        const response = await fetch("http://localhost:8080/server/servlet/?op=", {
            method: "POST",
            body: JSON.stringify({
                title: title,
            }),
        });
        const data = await response.json();
        if (data.status === "ok") {
            setMod(method);
        } else {
            console.log(data.message);
        }
    }

    useEffect(() => {
        const fetchQuizzListCreated = async () => {
            const response = await fetch("http://localhost:8080/server/servlet/?op=quizzList", {
                method: "POST",
                mode: "no-cors",
                body: JSON.stringify({
                    username: user,
                })
            });
            const data = await response.json();
            setQuizzListCreated(data.data);
            console.log(data);
        }

        const fetchQuizzListAnswered = async () => {
            const response = await fetch("http://localhost:8080/server/servlet/?op=quizzList", {
                method: "POST",
                mode: "no-cors",
                body: JSON.stringify({
                    username: user,
                })
            });
            const data = await response.json();
            setQuizzListAnswered(data.data);
            console.log(data);
        }

        fetchQuizzListCreated();
        fetchQuizzListAnswered();
    })

    return (
        <div className="home">
            <Header />
            {
                mod === "list" && <>
                    <div className="myquizz-content">
                        <div className="myquizz-created">
                            <QuizzList names={quizzListCreated} method="created" title="Quizz Created" callback={handleListClick} />
                        </div>
                        <div className="myquizz-answered">
                            <QuizzList names={quizzListAnswered} method="answered" title="Quizz Answered" callback={handleListClick} />
                        </div>
                    </div>
                </>
            }
            {
                mod === "created" && <ReviewCreated data={quizz} />
            }
            {
                mod === "answered" && <ReviewAnswered data={quizzreview} />
            }
        </div>
    )
};

export default MyQuizz