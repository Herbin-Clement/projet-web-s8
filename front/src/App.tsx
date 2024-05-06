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
import Invite from './Component/invite/Invite';
import Join from './Component/join/Join';
import Profil from './Component/profil/Profil';

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
          <Route path="/invite" element={<Invite />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
