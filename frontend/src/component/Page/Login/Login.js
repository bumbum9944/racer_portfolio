import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import OauthLogin from './OauthLogin';
import axios from 'axios';
import url from '../../../url/http';

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
            if (response.data.result === '존재하지 않는 유저입니다.') {
              alert('유저정보를 확인해주세요.');
            } else if (response.data.result === '비밀번호를 확인해주세요.') {
              alert('비밀번호를 확인해주세요.');
            } else {
              sessionStorage.setItem('token', response.data.result.token);
              const accessToken = sessionStorage.getItem('token')
              props.setAccessToken(accessToken);
              props.setCurrentUser(response.data.result.currentUser);
              history.push(`/mypage/${response.data.result.currentUser}`);
            }
          }).catch(err=>{
            console.log(err);
          })

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
      <div className="d-flex justify-content-center align-items-center" style={{height: '30vh'}}>
        <OauthLogin 
          setAccessToken={props.setAccessToken} 
          setCurrentUser={props.setCurrentUser} 
        />
      </div>
    </Container>
  );
}

export default Login;