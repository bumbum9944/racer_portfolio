import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
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
            history.push('/mypage');
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
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default Login;