import { React, useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import NetworkInner from './NetworkInner';
import url from '../url/http';
import axios from 'axios';

function Network(props) {

  let [userData, setUserData] = useState([]);

  useEffect(()=>{
    axios.get(url + 'account')
    .then((res)=>{
      setUserData(res.data.result);
    }).catch((err)=>{
      console.log(err);
    });
  }, []);

  let innerTag = userData.map((data, index)=><NetworkInner
    key={index} 
    name={data[0]}
    email={data[1]} />);

  if (userData.length % 2 === 1) {
    innerTag.push(<Col col="4"></Col>)
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