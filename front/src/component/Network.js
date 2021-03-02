import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import NetworkInner from './NetworkInner';

function Network() {
  let history = useHistory();

  return (
    <>
      <Form inline>
        <Form.Control type="text" placeholder="Search" className="" />
        <Button variant="outline-success">Search</Button>
      </Form>
      <NetworkInner />
    </>
  );
}

export default Network;