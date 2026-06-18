import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react'
import NavHeader from './components/NavHeader.jsx'; 
import { Navigate, Route, Routes } from 'react-router';
import API from './API/API.js';
import DefaultLayout from './components/DefaultLayout.jsx';
import { LoginForm } from './components/AuthComponents.jsx';
import NotFound from './components/NotFound.jsx'
import Home from './components/Home.jsx';
import Ranking from './components/Ranking.jsx';
import Map from './components/Map.jsx';
import GamePlan from './components/GamePlan.jsx';
import { GameExecute, GameResult } from './components/GameExecute&Result.jsx';

import './App.css';
import './styles/NavHeader.css';
import './styles/Home.css';
import './styles/AuthComponents.css';
import './styles/Ranking.css';
import "./styles/Map.css";
import "./styles/SVG.css";
import "./styles/GamePlan.css";
import "./styles/GameExecute&Result.css";

function App() {
  const [user, setUser] = useState(undefined);
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await API.getUserInfo();
        setLoggedIn(true);
        setUser(user);
      } catch(err) {
        console.warn(err);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setMessage({ msg: `Welcome, ${user.username}!`, type: "success" });
      setUser(user);
    } catch(err) {
      setMessage({ msg: err, type: "danger" });
    }
  };

  const handleLogout = async () => {
    await API.logOut();
    setLoggedIn(false);
    setMessage("");
    setUser(undefined);
  };  

  return (
    <>
      <Routes>
        <Route element={ <DefaultLayout loggedIn={loggedIn} handleLogout={handleLogout} message={message} setMessage={setMessage} /> }>
          <Route path='/' element={ <Home loggedIn={loggedIn} /> } />
          <Route path='/login' element={!loggedIn ? <LoginForm handleLogin={handleLogin} /> : <Navigate to='/' />} />
          <Route path='/game/setup' element={loggedIn ? <Map /> : <Navigate replace to='/' />} />
          <Route path='/game/plan' element={loggedIn ? <GamePlan /> : <Navigate replace to='/' />} />
          <Route path='/game/execute' element={loggedIn ? <GameExecute /> : <Navigate replace to='/' />} />
          <Route path='/game/result' element={loggedIn ? <GameResult /> : <Navigate replace to='/' />} />
          <Route path='/ranking' element={loggedIn ? <Ranking /> : <Navigate replace to="/" />} />
          <Route path='*' element={ <NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;
