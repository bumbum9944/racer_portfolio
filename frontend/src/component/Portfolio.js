import React from 'react';
import Education from './Education'
import Award from './Award'
import Project from './Project'
import License from './License'

function Portfolio(props) {

  return (
    <div>
      <Education accessToken={props.accessToken} />
      <Award accessToken={props.accessToken} />
      <Project accessToken={props.accessToken} />
      <License accessToken={props.accessToken} />
    </div>
  );
}

export default Portfolio;