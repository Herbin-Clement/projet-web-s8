import './profil.css';

import { Chart, defaults } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

import Header from '../header/Header';
import { useEffect, useState } from 'react';
import { useAuth } from '../../Hooks/useAuth';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.color = "black";

interface ProfileData {
    nb_quizz_cree: number,
    nb_quizz_repondu: number,
    pourcentage_bonne_reponse: number,
}

const Profil = () => {

    const { logout } = useAuth();

    const [profile, setProfile] = useState<ProfileData>({
        nb_quizz_cree: 0,
        nb_quizz_repondu: 0,
        pourcentage_bonne_reponse: 0
    });
    const { user } = useAuth();

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await fetch("http://localhost:8080/server/servlet/?op=getProfile", {
                method: "POST",
                body: JSON.stringify({
                    username: user,
                })
            })
            const data = await response.json();
            if (data.status === "ok") {
                setProfile({
                    nb_quizz_cree: data.nb_quizz_cree,
                    nb_quizz_repondu: data.nb_quizz_repondu,
                    pourcentage_bonne_reponse: data.pourcentage_bonne_reponse
                })
            }
        }

        fetchProfile();
    }, [])

    return (
        <div className="home">
            <Header />
            <div className="profil-content">
                <div className="profil-stat">
                    <div>Nombre de Quizz créé : {profile.nb_quizz_cree}</div>
                    <div>Nombre de Quizz répondu : {profile.nb_quizz_repondu}</div>
                    <div>Pourcentage de bonnes réponses : {profile.pourcentage_bonne_reponse}</div>
                    <button className="quizz-button-remove-question" onClick={() => logout()}>Déconnexion</button>
                </div>
            </div>
        </div>
    )
}

export default Profil;

{/* <Doughnut
    data={{
        labels: ["Good", "Wrong"],
        datasets: [
            {
                label: "Count",
                data: [50, 100],
                backgroundColor: [
                    "rgba(249, 76, 16, 0.8)",
                    "rgba(89, 206, 143, 0.8)",
                ],
                borderColor: [
                    "rgba(136, 136, 136, 0.8)",
                    "rgba(136, 136, 136, 0.8)",
                ],
            },
        ],
    }}
    options={{
        plugins: {
            title: {
                text: "Revenue Sources",
                align: "center"
            },
        },
    }}
/> */}