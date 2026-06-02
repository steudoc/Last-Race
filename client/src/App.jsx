import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
import './App.css'
import NavHeader from './components/NavHeader.jsx'; 
import { Navigate, Route, Routes } from 'react-router';
import API from './API/API.js';
import DefaultLayout from './components/DefaultLayout.jsx';
import { LoginForm } from './components/AuthComponents.jsx';

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
          <Route path='/' />
          <Route path='/login' element={!loggedIn ? <LoginForm handleLogin={handleLogin} /> : <Navigate to='/' />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;

/*
<Route path='/map' element={loggedIn ? <MapSetup /> : <Navigate to="/" />} />
<Route path='/game' element={loggedIn ? <GamePage user={user} /> : <Navigate to="/" />} />
<Route path='/ranking' element={loggedIn ? <Ranking /> : <Navigate to="/" />} />
*/
