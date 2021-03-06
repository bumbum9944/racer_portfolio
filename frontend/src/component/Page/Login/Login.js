import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import url from '../../../url/http';
import googleLogin from '../../../image/btn_google_signin_light_normal_web.png'

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
          <Form.Label 
            style={{  
              fontFamily: 'Noto Sans KR, sans-serif', 
              fontSize: '110%', 
              fontWeight: 'bold'
            }}
          >
            Email
          </Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter email" 
            style={{  
              fontFamily: 'Noto Sans KR, sans-serif', 
              fontSize: '110%', 
              fontWeight: 'bold'
            }}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label
            style={{  
              fontFamily: 'Noto Sans KR, sans-serif', 
              fontSize: '110%', 
              fontWeight: 'bold'
            }}
          >
            Password
          </Form.Label>
          <Form.Control name="password" type="password" placeholder="Password" 
            style={{  
              fontFamily: 'Noto Sans KR, sans-serif', 
              fontSize: '110%', 
              fontWeight: 'bold'
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit"
          style={{  
            fontFamily: 'Noto Sans KR, sans-serif', 
            fontSize: '110%', 
            fontWeight: 'bold'
          }}
        >
          Submit
        </Button>
      </Form>

      <a href="/" onClick={(e)=>{
        e.preventDefault();
        axios.get('https://accounts.google.com/o/oauth2/auth?client_id=181746160743-776h0kr7q74n5at88a429j2iopioo852.apps.googleusercontent.com&redirect_url=http://localhost:5000/auth/google/callback')
        .then(res=>{
          console.log(res)
        }).catch(err=>{
          console.log(err)
        })
      }}>
        <img src={googleLogin} alt="구글 로그인" />
      </a>
    </Container>
  );
}

export default Login;