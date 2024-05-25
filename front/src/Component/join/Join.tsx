import React, { useState } from 'react';

import './join.css';

import Header from '../header/Header';
import QuizzList from './QuizzList';

const mockNames = ["Quizz 1", "Quizz 2", "Quizz 3"];

const Join = () => {

    const [link, setLink] = useState<string>("");

    const updateLink = (e: React.FormEvent<HTMLInputElement>): void => {
        setLink(e.currentTarget.value);
    }

    const handleClick = (): void => {
        if (link !== "") {
            console.log("Click !");
        }
    }

    const handleListClick = (id: number): void => {
        console.log(id);
    }

    return (
        <div className="home">
            <Header />
            <div className="join-content">
                <div className="join-left">
                    <div className="join-entry">
                        <div className="name">Lien d'invitation</div>
                        <input type="text" placeholder="Link" value={link} onChange={e => updateLink(e)} />
                    </div>
                    <button type="button" onClick={() => handleClick()}>Go !</button>
                </div>
                <div className="join-right">
                    <QuizzList names={mockNames} title="Quizz List" method="" callback={handleListClick} />
                </div>
            </div>
        </div>
    )
}

export default Join;