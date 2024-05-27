import { useEffect, useState } from "react";

import QuizzList from "../join/QuizzList";
import { quizz, quizzreview } from "../../App";
import Header from "../header/Header";
import ReviewCreated from "./created/ReviewCreated";
import ReviewAnswered from "./answered/ReviewAnswered";

import './myquizz.css';
import { useAuth } from "../../Hooks/useAuth";
import { QuizzData, QuizzDataReview } from "../../Type/interface";

const MyQuizz = () => {

    const [mod, setMod] = useState<string>("list");
    const [quizzCreated, setQuizzCreated] = useState<QuizzData | undefined>(undefined);
    const [quizzAnswered, setQuizzAnswered] = useState<QuizzDataReview | undefined>(undefined);
    const [quizzListCreated, setQuizzListCreated] = useState<string[]>([]);
    const [quizzListAnswered, setQuizzListAnswered] = useState<string[]>([]);
    const { user } = useAuth();

    const handleListClick = async (title: string, method: string) => {
        if (method === "created") {
            const response = await fetch("http://localhost:8080/server/servlet/?op=joinQuizzLink", {
                method: "POST",
                body: JSON.stringify({
                    title: title,
                }),
            });
            const data = await response.json();
            if (data.status.startsWith('ok')) {
                const q: QuizzData = data.quizzData;
                setQuizzCreated(q);
                setMod(method);
            } else {
                console.log(data.message);
            }
        } else {
            const response = await fetch("http://localhost:8080/server/servlet/?op=getCorrectionQuizz", {
                method: "POST",
                body: JSON.stringify({
                    title: title,
                    username: user,
                }),
            });
            const data = await response.json();
            if (data.status.startsWith('ok')) {
                const q: QuizzDataReview = data.quizzDataReview;
                setQuizzAnswered(q);
                setMod(method);
            } else {
                console.log(data.message);
            }
        }
    }

    useEffect(() => {
        const fetchQuizzListCreated = async () => {
            const response = await fetch("http://localhost:8080/server/servlet/?op=getCreatedQuizzes", {
                method: "POST",
                body: JSON.stringify({
                    username: user,
                })
            });
            const data = await response.json();
            let arr: string[] = [];
            data.quizzDataList.forEach((el: any) => arr.push(el.title));
            setQuizzListCreated(arr);
        }

        const fetchQuizzListAnswered = async () => {
            const response = await fetch("http://localhost:8080/server/servlet/?op=getAnsweredQuizzes", {
                method: "POST",
                body: JSON.stringify({
                    username: user,
                })
            });
            const data = await response.json();
            let arr: string[] = [];
            data.quizzDataList.forEach((el: any) => arr.push(el.title));
            setQuizzListAnswered(arr);
        }

        fetchQuizzListCreated();
        fetchQuizzListAnswered();
    }, [])

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
                mod === "created" && <ReviewCreated data={quizzCreated} />
            }
            {
                mod === "answered" && <ReviewAnswered data={quizzAnswered} />
            }
        </div>
    )
};

export default MyQuizz