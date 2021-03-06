import { React } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import url from '../../url/http';

function AwardForm(props) {

  return(
    <Card>
      <Card.Body>
        <Form onSubmit={function(e) {
          e.preventDefault();
          if(props.formMode === 'Submit') {

            axios.post(url + 'award/post',{
              name: e.target.name.value,
              description: e.target.description.value,
            }, props.header)
            .then((res)=>{
              props.changeAwardData(res.data.res);
            }).catch((err)=>{
              console.log(err);
            });
          } else {

            axios.put(url + `award/post/${props.postId}`,{
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
            <Form.Label
              style={{
                fontFamily: 'Noto Sans KR, sans-serif',
                fontSize: '120%',
                fontWeight: 'bold'
              }}
            >
              수상내역
            </Form.Label>
            <Form.Control type="text" name="name" defaultValue={props.name} 
              style={{
                fontFamily: 'Noto Sans KR, sans-serif',
                fontSize: '110%',
                fontWeight: 'bold'
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label
              style={{
                fontFamily: 'Noto Sans KR, sans-serif',
                fontSize: '120%',
                fontWeight: 'bold'
              }}
            >
              상세내역
            </Form.Label>
            <Form.Control type="text" name="description" defaultValue={props.description} 
              style={{
                fontFamily: 'Noto Sans KR, sans-serif',
                fontSize: '110%',
                fontWeight: 'bold'
              }}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button className="mr-2" variant="secondary" type="submit"
              style={{
                fontFamily: 'Noto Sans KR, sans-serif',
                fontSize: '110%',
                fontWeight: 'bold'
              }}
            >
              {props.formMode}
            </Button>
            <Button variant="secondary" type="submit" 
              onClick={()=>{
                props.changeMode('READ');
              }}
              style={{
                fontFamily: 'Noto Sans KR, sans-serif',
                fontSize: '110%',
                fontWeight: 'bold'
              }}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );

}

export default AwardForm;