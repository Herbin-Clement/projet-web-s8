import './profil.css';

import { Chart, defaults } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

import Header from '../header/Header';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.color = "black";


const Profil = () => {
    return (
        <div className="home">
            <Header />
            <div className="profil-content">
                <div className="profil-stat">
                    <Doughnut
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
                    />
                </div>
            </div>
        </div>
    )
}

export default Profil;