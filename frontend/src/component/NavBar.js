import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function NavBar(props) {
  let history = useHistory();
  let innerTag = '';

  if (props.accessToken !== null) {
    innerTag = 
    <>
      <Nav.Link onClick={()=>{
        history.push('/mypage');
      }}>마이페이지</Nav.Link>
      <Nav.Link onClick={()=>{
        sessionStorage.removeItem('token');
        props.setAccessToken(null);
        props.setCurrentUser(null);
        history.push('/login');
      }}>로그아웃</Nav.Link>
    </>
  } else {
    innerTag = <>
      <Nav.Link onClick={()=>{
      history.push('/login');
      }}>
        로그인
      </Nav.Link>
      <Nav.Link onClick={()=>{
      history.push('/signup');
      }}>
        회원가입
      </Nav.Link>
    </>
  }
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Portfolio</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={()=>{
            history.push('/');
          }}>
            Home
          </Nav.Link>
          {innerTag}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;