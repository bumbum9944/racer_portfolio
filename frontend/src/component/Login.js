import React from 'react';
import { useHistory } from 'react-router-dom';
import url from '../url/http';
import axios from 'axios';

function Login(props) {

  let history = useHistory();

  return (
    <>
      <form onSubmit={
        function(e) {
          e.preventDefault();
          var data = {
            'email': e.target.email.value,
            'password': e.target.password.value
          }

          axios.post(url + 'account', data)
          .then(response=>{
            sessionStorage.setItem('token', response.data.result.token);
            const accessToken = sessionStorage.getItem('token')
            props.setAccessToken(accessToken);
            props.setIsLoggedIn(true);
            history.push('/');
          });

        }
      }>
        <div>
          <label>
            email:
            <input type="text" name="email" placeholder="abc@email.com" />
          </label>
        </div>
        <div>
          <label>
            password:
            <input type="text" name="password" placeholder="123@?#abc" />
          </label>
        </div>
        <div>
          <button type="submit">로그인</button>
        </div>
      </form>
    </>
  );
}

export default Login;