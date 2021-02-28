import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

function Nav(props) {
  let innerTag = ''
  if (props.isLoggedIn === true) {
    innerTag = <Link to="/login" onClick={()=>{
      sessionStorage.removeItem('token');
      props.setIsLoggedIn(false)
      props.history.push('/login');
    }}>로그아웃</Link>
    
  } else {
    innerTag = <>
      <Link to="/login">로그인</Link>
      <Link to="/signup">회원가입</Link>
    </>
  }
  return (
    <>
      <Link to="/">Home</Link>
      {innerTag}
    </>
  );
}

export default withRouter(Nav);