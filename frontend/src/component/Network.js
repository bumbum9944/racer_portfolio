import { React, useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import NetworkInner from './NetworkInner';
import url from '../url/http';
import axios from 'axios';

function Network(props) {

  let [userData, setUserData] = useState([]);
  let innerTag = [];

  useEffect(()=>{
    axios.get(url + 'account')
    .then((res)=>{
      setUserData(res.data.result);
    }).catch((err)=>{
      console.log(err);
    });
  }, [props]);
  for (let i=0; i < userData.length; i++) {
    if (userData[i][0] !== props.currentUser) {
      innerTag.push(<NetworkInner
        key={i}
        name={userData[i][1]}
        email={userData[i][2]} />)
    }
  }

  if (innerTag.length % 2 === 1) {
    innerTag.push(<Col key={userData.length} col="4"></Col>)
  }
  return (
    <div>
      <Form className="d-flex justify-content-center my-3">
          <Form.Control style={{ width: '50%' }} type="text" placeholder="Search" className="" />
          <Button variant="outline-success">Search</Button>
      </Form>
      <Container>
        <Row>
          {innerTag}
        </Row>
      </Container>
    </div>
  );
}

export default Network;