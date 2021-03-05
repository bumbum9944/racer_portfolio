import { React } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import url from '../../url/http';

function EducationInner(props) {

  let buttonTag
  
  if (props.currentUser === props.targetId) {
    buttonTag = 
    <div className="d-flex justify-content-end align-items-center" style={{width: '100%'}}>
      <Button variant="primary" onClick={()=>{
        props.changeTargetIndex(props.index);
        props.changeMode('EDIT');
      }}>수정</Button>
      <Button variant="danger" onClick={()=>{
        axios.delete(url + `education/post/${props.postId}`, props.header)
        .then(res=>{
          props.changeProjectData(res.data.res);
        }).catch(err=>{
          console.log(err);
        });
      }}>삭제</Button>
    </div>
  } else {
    buttonTag = <></>
  }

  return(
    <Card key={props.index} className="mb-2" >
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
        {buttonTag}
      </Card.Body>
    </Card>
  );
  
}

export default EducationInner;