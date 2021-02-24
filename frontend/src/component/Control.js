import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

function Control(props) {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/login">로그인</Link>
      <Link to="/signup">회원가입</Link>
      <button onClick={
        function() {
          sessionStorage.removeItem('token');
          props.history.push('/login');
        }
      }>로그아웃</button>
    </>
  );
}

export default withRouter(Control);