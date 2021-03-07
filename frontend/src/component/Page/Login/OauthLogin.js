import React from 'react';
import url from '../../../url/http';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import GOOGLE_CLIENT_ID from '../../../env/authKey'



function OauthLogin (props) {

  let history = useHistory();

  const googleLogin = (response) => {
    // login 로직 구현
    const option = {
        google_id: response.profileObj.googleId,
        name: response.profileObj.name
    };
  
    axios.post(url + 'google/login', option)
    .then(response=>{
      sessionStorage.setItem('token', response.data.result.token);
      const accessToken = sessionStorage.getItem('token')
      props.setAccessToken(accessToken);
      props.setCurrentUser(response.data.result.currentUser);
      history.push(`/mypage/${response.data.result.currentUser}`);
    }).catch(err=>{
      console.log(err);
    })
  }
  
  const onFailure = (response) => {
    console.log(response);
  }

  return (
    <div>
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Sign in with Google"
        onSuccess={googleLogin}
        onFailure={onFailure}
      />
    </div>
  );
   
}


export default OauthLogin;