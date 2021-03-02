import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function NavBar(props) {
  let history = useHistory();
  let innerTag = '';

  if (props.isLoggedIn === true) {
    innerTag = <Nav.Link as="li" onClick={()=>{
      sessionStorage.removeItem('token');
      props.setIsLoggedIn(false);
      props.history.push('/login');
    }}>로그아웃</Nav.Link>
    
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
            if(props.isLoggedIn === true) {
              history.push('/');
            } else {
              history.push('/login');
            }
          }}>
            Home
          </Nav.Link>
          {innerTag}
          <Nav.Link>Network</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;