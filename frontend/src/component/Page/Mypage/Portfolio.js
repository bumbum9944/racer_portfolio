import React from 'react';
import { Container, Card } from 'react-bootstrap';
import Education from '../../Education/Education'
import Award from '../../Award/Award'
import Project from '../../Project/Project'
import License from '../../License/License'
import Profile from '../../Profile/Profile';

function Portfolio(props) {

  return (
    <Container fluid className="d-flex p-0" style={{height: "100%"}}>
      <Profile 
        accessToken={props.accessToken}
        currentUser={props.currentUser} 
        targetId={Number(props.targetId)}
      />
      <Card style={{width: '50%', height: '100%'}}>
        <Card.Body>
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
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Portfolio;