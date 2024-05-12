import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Register from './Component/register/Register';
import Login from './Component/login/Login';
import Home from './Component/home/Home';
import Create from './Component/create/Create';
import Quizz from './Component/quizz/Quizz';
import Invite from './Component/invite/Invite';
import Join from './Component/join/Join';
import Profil from './Component/profil/Profil';

const quizz = {
  "title": "Premier quizz",
  "questions": [
    {
      "question": "Suis-je la question 1 ?",
      "id": 10,
      "answers": [
        {
          "text": "Oui",
          "id": 50,
          "ok": true,
        },
        {
          "text": "Non",
          "id": 51,
          "ok": false,
        },
        {
          "text": "Peut-être",
          "id": 49,
          "ok": false,
        }
      ]
    },
    {
      "question": "Suis-je la question 2 ?",
      "id": 11,
      "answers": [
        {
          "text": "Non",
          "id": 52,
          "ok": false,
        },
        {
          "text": "Oui",
          "id": 53,
          "ok": true,
        }
      ]
    },
    {
      "question": "Suis-je la question 4 ?",
      "id": 12,
      "answers": [
        {
          "text": "Non",
          "id": 54,
          "ok": true,
        },
        {
          "text": "Oui",
          "id": 55,
          "ok": false,
        },
        {
          "text": "Je sais pas",
          "id": 56,
          "ok": false,
        },
        {
          "text": "Je ne suis point sûre. Cependant je suis une réponse assez longue !",
          "id": 57,
          "ok": false,
        }
      ]
    }
  ]
}

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/join" element={<Join />} />
          <Route path="/create" element={<Create />} />
          <Route path="/quizz" element={<Quizz data={quizz} />} />
          <Route path="/invite" element={<Invite />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
