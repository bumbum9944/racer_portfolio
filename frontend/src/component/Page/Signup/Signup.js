import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import url from '../../../url/http';
import axios from 'axios';

function Signup(props) {
  var [name, setName] = useState('');
  var [email, setEmail] = useState('')
  var [error, setError] = useState('');
  var [password, setPassword] = useState('');
  
  let history = useHistory();

  return (
    <Container className="mt-5">
      <Form onSubmit={
        function(e) {
          e.preventDefault();
          var data = {
            'name': name,
            'email': email,
            'password': password
          }
          if(error === '비밀번호가 일치합니다.') {
            axios.post(url + 'account', data)
            .then(response=>{
              history.push('/login');
            });
          }

        }
      }>
        <Form.Group>
          <Form.Label
            style={{  
              fontFamily: 'Noto Sans KR, sans-serif', 
              fontSize: '110%', 
              fontWeight: 'bold'
            }}
          >
            Name
          </Form.Label>
          <Form.Control name="name" type="text" placeholder="이름을 입력해주세요"
            onChange={function(e) {
              setName(e.target.value);
            }}
            style={{  
              fontFamily: 'Noto Sans KR, sans-serif', 
              fontSize: '110%', 
              fontWeight: 'bold'
            }} 
          />
        </Form.Group>
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
            onChange={function(e) {
              setEmail(e.target.value);
            }} 
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
            onChange={
              function(e) {
                setPassword(e.target.value);
              }
            }
            style={{  
              fontFamily: 'Noto Sans KR, sans-serif', 
              fontSize: '110%', 
              fontWeight: 'bold'
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label
            style={{  
              fontFamily: 'Noto Sans KR, sans-serif', 
              fontSize: '110%', 
              fontWeight: 'bold'
            }}
          >
            Password
          </Form.Label>
          <Form.Control name="passwordCheck" type="password" placeholder="Password" 
            onChange={
              function(e) {
                var checker = e.target.value;
                if(checker === password) {
                  setError('비밀번호가 일치합니다.');
                } else {
                  setError('비밀번호가 다릅니다.');
                }
              }            
            }
            style={{  
              fontFamily: 'Noto Sans KR, sans-serif', 
              fontSize: '110%', 
              fontWeight: 'bold'
            }}
          />
        </Form.Group>
        <p>{error}</p>
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
    </Container>
  );
}

export default Signup;