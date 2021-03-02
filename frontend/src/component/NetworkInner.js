import React from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function NetworkInner(props) {
    
  return(
    <Col col="4" className="my-2">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>
            {props.email}
          </Card.Text>
          <Button variant="primary">Home</Button>
        </Card.Body>
      </Card>
    </Col>
  );

}

export default NetworkInner;