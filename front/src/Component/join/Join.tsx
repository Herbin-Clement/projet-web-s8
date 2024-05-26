import React, { useEffect, useState } from 'react';

import './join.css';

import Header from '../header/Header';
import QuizzList from './QuizzList';
import { useAuth } from '../../Hooks/useAuth';
import { QuizzData } from '../../Type/interface';
import { useNavigate } from 'react-router-dom';

interface JoinProps {
    callback: (data: string) => void,
}

const Join = ({ callback }: JoinProps) => {

    const [link, setLink] = useState<string>("");
    const [quizzList, setQuizzList] = useState<string[]>([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    const updateLink = (e: React.FormEvent<HTMLInputElement>): void => {
        setLink(e.currentTarget.value);
    }

    const handleClick = async () => {
        if (link !== "") {
            callback(link);
            navigate("/quizz");
        }
    }

    const handleListClick = async (title: string) => {
        console.log(JSON.stringify({
            title: title,
        }))
        callback(title);
        navigate("/quizz");
    }

    useEffect(() => {
        const fetchQuizzList = async () => {
            const response = await fetch("http://localhost:8080/server/servlet/?op=listQuizzes", {
                method: "POST",
                body: JSON.stringify({
                    username: user,
                })
            });
            const data = await response.json();
            let arr: string[] = [];
            data.quizzDataList.forEach((el: any) => arr.push(el.title));
            setQuizzList(arr);
        }

        fetchQuizzList();
    }, [])

    return (
        <div className="home">
            <Header />
            <div className="join-content">
                <div className="join-left">
                    <div className="join-entry">
                        <div className="name">Titre d'un Quizz</div>
                        <input type="text" placeholder="Link" value={link} onChange={e => updateLink(e)} />
                    </div>
                    <button type="button" onClick={() => handleClick()}>Go !</button>
                </div>
                <div className="join-right">
                    <QuizzList names={quizzList} title="Liste des quizz" method="" callback={handleListClick} />
                </div>
            </div>
        </div>
    )
}

export default Join;