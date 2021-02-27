import { React } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import url from '../url/http';

function AwardForm(props) {

  return(
    <Form onSubmit={function(e) {
      e.preventDefault();
      if(props.formMode === '제출') {

        axios.post(url + 'post/award',{
          name: e.target.name.value,
          description: e.target.description.value,
        }, props.header)
        .then((res)=>{
          props.changeAwardData(res.data.res);
        }).catch((err)=>{
          console.log(err);
        });
      } else {

        axios.put(url + `post/award/${props.postId}`,{
          name: e.target.name.value,
          description: e.target.description.value,
        }, props.header)
        .then((res)=>{
          props.changeAwardData(res.data.res);
        }).catch((err)=>{
          console.log(err);
        });
      }
      
      props.changeMode('READ');
    }}>
      <Form.Group>
        <Form.Label>수상내역</Form.Label>
        <Form.Control type="text" name="name" defaultValue={props.name} />
      </Form.Group>
      <Form.Group>
        <Form.Label>상세내역</Form.Label>
        <Form.Control type="text" name="description" defaultValue={props.description} />
      </Form.Group>
      <Button variant="primary" type="submit">
        {props.formMode}
      </Button>
    </Form>
  );

}

export default AwardForm;