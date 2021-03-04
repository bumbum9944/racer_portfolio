import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Education from '../../Education/Education'
import Award from '../../Award/Award'
import Project from '../../Project/Project'
import License from '../../License/License'
import Profile from '../../Profile/Profile';

function Portfolio(props) {

  return (
    <Container fluid className="d-flex p-0">
    <Profile />  
    <div style={{width: '70%'}}>
      <Education 
        targetId={Number(props.targetId)} 
        accessToken={props.accessToken} 
        currentUser={props.currentUser}
      />
      <Award 
        targetId={Number(props.targetId)} 
        accessToken={props.accessToken} 
        currentUser={props.currentUser}
      />
      <Project 
        targetId={Number(props.targetId)} 
        accessToken={props.accessToken} 
        currentUser={props.currentUser}
      />
      <License 
        targetId={Number(props.targetId)} 
        accessToken={props.accessToken} 
        currentUser={props.currentUser}
      />
    </div>
    </Container>
  );
}

export default Portfolio;