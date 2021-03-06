import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import url from '../../../url/http';
import axios from 'axios';

function Signup(props) {
  var [name, setName] = useState('');
  var [email, setEmail] = useState('')
  var [password, setPassword] = useState('');
  var [firstPasswordError, setFirstPasswordError] = useState('');
  var [secondPasswordError, setSecondPasswordError] = useState('');
  var [emailError, setEmailError] = useState('');
  
  let history = useHistory();

  const validateEmail = (email) => {

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };


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
          if(firstPasswordError === '사용 가능한 비밀번호입니다.' && secondPasswordError === '비밀번호가 일치합니다.' && emailError === '사용 가능한 이메일입니다.') {
            axios.post(url + 'account', data)
            .then(response=>{
              if (response.data.result === '이미 존재하는 유저입니다.') {
                alert('이미 존재하는 유저입니다.')
              } else {
                history.push('/login');
              }
            });
          } else {
            alert('입력정보를 확인해주세요')
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
          <Form.Control name="email" type="email" defaultValue={email} placeholder="Enter email" 
            onChange={function(e) {
              const email =  e.target.value
              if (validateEmail(email)) {
                setEmail(email);
                setEmailError('사용 가능한 이메일입니다.')
              } else {
                setEmailError('이메일 형식에 맞지 않습니다.')
              }
            }} 
            style={{  
              fontFamily: 'Noto Sans KR, sans-serif', 
              fontSize: '110%', 
              fontWeight: 'bold'
            }}
          />
          <p
            style={{  
              fontFamily: 'Noto Sans KR, sans-serif', 
              fontWeight: 'bold'
            }}
          >
          {emailError}
          </p>
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
          <Form.Control name="password" type="password" defaultValue={password} placeholder="Password" 
            onChange={
              function(e) {
                setPassword(e.target.value);
                if (e.target.value.length < 8) {
                  setFirstPasswordError('비밀번호는 8자 이상입니다.')
                } else {
                  setFirstPasswordError('사용 가능한 비밀번호입니다.')
                }
              }
            }
            style={{  
              fontFamily: 'Noto Sans KR, sans-serif', 
              fontSize: '110%', 
              fontWeight: 'bold'
            }}
          />
          <p
            style={{  
              fontFamily: 'Noto Sans KR, sans-serif', 
              fontWeight: 'bold'
            }}
          >
            {firstPasswordError}
          </p>
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
                  setSecondPasswordError('비밀번호가 일치합니다.');
                } else {
                  setSecondPasswordError('비밀번호가 다릅니다.');
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
        <p
          style={{  
            fontFamily: 'Noto Sans KR, sans-serif', 
            fontWeight: 'bold'
          }}
        >
          {secondPasswordError}
        </p>
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