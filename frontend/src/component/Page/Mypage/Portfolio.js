import React from 'react';
import Education from '../../Education/Education'
import Award from '../../Award/Award'
import Project from '../../Project/Project'
import License from '../../License/License'

function Portfolio(props) {

  return (
    <div>
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
  );
}

export default Portfolio;