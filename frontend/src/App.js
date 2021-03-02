import { React, useState, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import Login from './component/Login'
import Signup from './component/Signup'
import NavBar from './component/NavBar'
import Home from './component/Home'


function App(props) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  const history = useHistory();

  useEffect(()=>{
    if (isLoggedIn === false) {
      history.push('/login')
    } 
  }, [isLoggedIn, history])
  
  return (
    <div className="App">
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={(data)=>{
        setIsLoggedIn(data);
      }} />
      <div className="d-flex justify-content-center">
        <Route path="/" render={()=> <Home accessToken={accessToken} />} exact={true} />
        <Route path="/login" render={()=> <Login setIsLoggedIn={(data)=>{
          setIsLoggedIn(data);
        }} setAccessToken={(data)=>{
          setAccessToken(data);
        }} />} />
        <Route path="/signup" component={Signup} />
      </div>
    </div>
  );
}

export default App;
