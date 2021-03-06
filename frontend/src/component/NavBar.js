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
        history.push(`/mypage/${props.currentUser}`);
      }}>마이페이지</Nav.Link>
      <Nav.Link onClick={()=>{
        sessionStorage.removeItem('token');
        props.setAccessToken(null);
        props.setCurrentUser(null);
        history.push('/');
      }}>로그아웃</Nav.Link>
    </>
  } else {
    innerTag = <>
      <Nav.Link 
      style={{
        fontFamily: 'Sunflower, sans-serif',
        fontSize: '150%'
      }}

      onClick={()=>{
        history.push('/login');
      }}>
        Login
      </Nav.Link>
      <Nav.Link 
      style={{
        fontFamily: 'Sunflower, sans-serif',
        fontSize: '150%'
      }}
      onClick={()=>{
        history.push('/signup');
      }}>
        Sign-up
      </Nav.Link>
    </>
  }
  return (
    <Navbar sticky="top" bg="light" expand="lg">
      <Navbar.Brand style={{
        fontFamily: 'Sunflower, sans-serif',
        fontSize: '200%'
    }}>Portfolio</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link 
          style={{
            fontFamily: 'Sunflower, sans-serif',
            fontSize: '150%'
          }}
          onClick={()=>{
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