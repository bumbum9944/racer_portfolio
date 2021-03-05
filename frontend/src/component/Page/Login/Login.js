import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import url from '../../../url/http';
import axios from 'axios';

function Login(props) {

  let history = useHistory();

  return (
    <Container className="mt-5">
      <Form onSubmit={
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
            props.setCurrentUser(response.data.result.currentUser);
            history.push(`/mypage/${response.data.result.currentUser}`);
          });

        }
      }>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          로그인
        </Button>
      </Form>
    </Container>
  );
}

export default Login;