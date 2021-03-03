import { React, useState } from 'react';
import { Route } from 'react-router-dom';
// import { Container } from 'react-bootstrap';
import Login from './component/Login';
import Signup from './component/Signup';
import NavBar from './component/NavBar';
import Home from './component/Home';
import Network from './component/Network';


function App() {

  const [accessToken, setAccessToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // const history = useHistory();

  // useEffect(()=>{
  //   if (accessToken === null) {
  //     history.push('/login')
  //   } 
  // }, [isLoggedIn, history])
  
  return (
    <div className="App">
      <NavBar accessToken={accessToken} setAccessToken={(data)=>{
        setAccessToken(data);
      }} setCurrentUser={(data)=>{
        setCurrentUser(data)
      }} />
      <div>
        <Route path="/mypage" render={()=> <Home accessToken={accessToken} />} />
        <Route path="/login" render={()=> <Login setAccessToken={(data)=>{
          setAccessToken(data);
        }} setCurrentUser={(data)=>{
          setCurrentUser(data);
        }} />} />
        <Route path="/signup" component={Signup} />
        <Route path="/" render={()=> <Network accessToken={accessToken}
        currentUser={currentUser} />} exact={true} />
      </div>
    </div>
  );
}

export default App;
