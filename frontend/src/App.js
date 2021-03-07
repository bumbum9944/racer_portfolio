import { React, useState } from 'react';
import { Route } from 'react-router-dom';
// import { Container } from 'react-bootstrap';
import Login from './component/Page/Login/Login';
import Signup from './component/Page/Signup/Signup';
import NavBar from './component/NavBar';
import MyPage from './component/Page/Mypage/MyPage';
import Network from './component/Page/Network/Network';


function App() {

  const [accessToken, setAccessToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  
  return (
    <div className="App">
      <NavBar
        currentUser={currentUser}
        accessToken={accessToken} 
        setAccessToken={(data)=>{
          setAccessToken(data);
        }} setCurrentUser={(data)=>{
          setCurrentUser(data)
        }} 
      />
      <div>
        <Route path="/mypage/:id" render={(props)=> <MyPage targetId={props.match.params.id} currentUser={currentUser} accessToken={accessToken} />} />
        <Route path="/login" render={()=> <Login 
          setAccessToken={(data)=>{
            setAccessToken(data);
          }} setCurrentUser={(data)=>{
            setCurrentUser(data);
          }} />} 
        />
        <Route path="/signup" component={Signup} />
        <Route path="/" render={()=> <Network accessToken={accessToken}
        currentUser={currentUser} />} exact={true} />
      </div>
    </div>
  );
}

export default App;
