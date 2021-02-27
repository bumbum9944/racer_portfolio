import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import url from '../url/http';
import axios from 'axios';

function Signup(props) {
  var [name, setName] = useState('');
  var [email, setEmail] = useState('')
  var [error, setError] = useState('');
  var [password, setPassword] = useState('');
  
  let history = useHistory();

  return (
    <>
      <form onSubmit={
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
              console.log(response);
              history.push('/login');
            });
          } else {
            console.log('비밀번호가 다릅니다.');
          }

        }
      }>
        <div>
          <label>
            이름:
            <input type="text" name="name" placeholder="이름을 입력해주세요" onChange={function(e) {
              setName(e.target.value);
            }} />
          </label>
        </div>
        <div>
          <label>
            email:
            <input type="text" name="email" placeholder="abc@email.com" onChange={function(e) {
              setEmail(e.target.value);
            }} />
          </label>
        </div>
        <div>
          <label>
            비밀번호:
            <input type="text" name="password" placeholder="123@?#abc" onChange={
              function(e) {
                setPassword(e.target.value);
              }
            } />
          </label>
        </div>
        <div>
          <label>
            비밀번호 확인:
            <input type="text" name="password-checker" placeholder="123@?#abc" onChange={
              function(e) {
                var checker = e.target.value;
                if(checker === password) {
                  setError('비밀번호가 일치합니다.');
                } else {
                  setError('비밀번호가 다릅니다.');
                }
              }            
            } />
          </label>
        </div>
        <p>{error}</p>
        <div>
          <button type="submit">회원가입</button>
        </div>
      </form>
    </>
  );
}

export default Signup;