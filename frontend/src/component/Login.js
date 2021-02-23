import React from 'react';
import url from '../url/http';
import axios from 'axios';

function Login() {
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
            console.log(response);
          });

        }
      }>
        <div>
          <label for="email">email</label>
          <input type="text" name="email" placeholder="abc@email.com" />
        </div>
        <div>
          <label for="password">password</label>
          <input type="text" name="password" placeholder="123@?#abc" />
        </div>
        <div>
          <button type="submit">로그인</button>
        </div>
      </form>
    </>
  );
}

export default Login;