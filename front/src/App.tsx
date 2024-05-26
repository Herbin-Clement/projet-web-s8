import './App.css';

import { useState } from 'react';

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
import Join from './Component/join/Join';
import Profil from './Component/profil/Profil';
import MyQuizz from './Component/review/MyQuizz';
import { AuthProvider } from './Hooks/useAuth';
import { ProtectedRoute } from './Component/utils/ProtectedRoute';
import { NotProtectedRoute } from './Component/utils/NotProtectedRoute';

export const quizz = {
  "title": "Premier quizz",
  "creatorUsername": "ruben",
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

export const quizzreview = {
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
          "res": false,
        },
        {
          "text": "Non",
          "id": 51,
          "ok": false,
          "res": false,
        },
        {
          "text": "Peut-être",
          "id": 49,
          "ok": false,
          "res": false,
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
          "res": true,
        },
        {
          "text": "Oui",
          "id": 53,
          "ok": true,
          "res": false,
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
          "res": true,
        },
        {
          "text": "Oui",
          "id": 55,
          "ok": false,
          "res": false,
        },
        {
          "text": "Je sais pas",
          "id": 56,
          "ok": false,
          "res": true,
        },
        {
          "text": "Je ne suis point sûre. Cependant je suis une réponse assez longue !",
          "id": 57,
          "ok": false,
          "res": false,
        }
      ]
    }
  ]
}

const App = () => {

  const [quizz, setQuizz] = useState<string>("");

  const quizzSelected = (title: string): void => {
    setQuizz(title);
  }

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />

            <Route path="/login" element={
              <NotProtectedRoute>
                <Login />
              </NotProtectedRoute>
            } />

            <Route path="/register" element={
              <NotProtectedRoute>
                <Register />
              </NotProtectedRoute>
            } />

            <Route path="/home" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />

            <Route path="/join" element={
              <ProtectedRoute>
                <Join callback={quizzSelected} />
              </ProtectedRoute>
            } />

            <Route path="/create" element={
              <ProtectedRoute>
                <Create />
              </ProtectedRoute>
            } />

            <Route path="/quizz" element={
              <ProtectedRoute>
                <Quizz title={quizz} />
              </ProtectedRoute>
            } />

            <Route path="/myquizz" element={
              <ProtectedRoute>
                <MyQuizz />
              </ProtectedRoute>
            } />

            <Route path="/profil" element={
              <ProtectedRoute>
                <Profil />
              </ProtectedRoute>
            } />

            <Route path="*" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;