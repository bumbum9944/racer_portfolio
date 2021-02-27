import { React } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import url from '../url/http';
import EducationForm from './EducationForm';

function EducationInner(props) {

  var accessToken = sessionStorage.getItem('token');

  const header = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }

  return(
    <Card key={props.index}>
      <Card.Body className="d-flex">
        <div style={{width: '100%'}}>
          <Card.Text>
            학교 : {props.schoolName}
          </Card.Text>
          <Card.Text>
            전공 : {props.major}
          </Card.Text>
          <Card.Text>
            {props.degree}
          </Card.Text>
        </div>
        <div className="d-flex justify-content-end align-items-center" style={{width: '100%'}}>
          <Button variant="primary" data-index={props.index} data-schoolName={props.schoolName}
          data-major={props.major} data-degree={props.degree} onClick={(e)=>{
            var newEdueData = [...eduData];
            // newEdueData[Number(e.target.dataset.index)] = 
            
          }}>수정</Button>
          <Button variant="danger" onClick={()=>{
            axios.delete(url + `post/education/${props.post_id}`, header)
            .then(res=>{
              props.changeEdueData(res.data.res);
            }).catch(err=>{
              console.log(err);
            });
          }}>삭제</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default EducationInner;