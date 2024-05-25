import React, { useEffect, useState } from 'react';

import './join.css';

import Header from '../header/Header';
import QuizzList from './QuizzList';
import { useAuth } from '../../Hooks/useAuth';

const Join = () => {

    const [link, setLink] = useState<string>("");
    const [quizzList, setQuizzList] = useState<string[]>([]);
    const { user } = useAuth();

    const updateLink = (e: React.FormEvent<HTMLInputElement>): void => {
        setLink(e.currentTarget.value);
    }

    const handleClick = async () => {
        if (link !== "") {
            const response = await fetch("http://localhost:8080/server/servlet/?op=joinQuizzLink", {
                method: "POST",
                mode: "no-cors",
                body: JSON.stringify({
                    title: link,
                }),
            });
            const data = await response.json();
            console.log(data);
        }
    }

    const handleListClick = async (title: string) => {
        const response = await fetch("http://localhost:8080/server/servlet/?op=joinQuizzLink", {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify({
                title: title,
            }),
        });
        const data = await response.json();
        console.log(data);
    }

    useEffect(() => {
        const fetchQuizzList = async () => {
            const response = await fetch("http://localhost:8080/server/servlet/?op=quizzList", {
                method: "POST",
                mode: "no-cors",
                body: JSON.stringify({
                    username: user,
                })
            });
            const data = await response.json();
            setQuizzList(data.data);
            console.log(data);
        }

        fetchQuizzList();
    })

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