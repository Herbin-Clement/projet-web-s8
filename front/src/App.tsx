import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route, 
} from "react-router-dom";

import Register from './Component/register/Register';
import Login from './Component/login/Login';
import Home from './Component/home/Home';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
