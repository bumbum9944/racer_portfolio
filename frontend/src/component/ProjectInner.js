import { React } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import url from '../url/http';

function ProjectInner(props) {

  function dateToYear(date) {
    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    if (month < 10)  {
        month = '0' + month;
    }

    var dt = date.getDate();
    if (dt < 10) {
        dt = '0' + dt;
    }
    
    return year + '-' + month + '-' + dt;
  }

  let startDate = dateToYear(new Date(props.startDate))
  let endDate = dateToYear(new Date(props.endDate))

  return(
    <Card key={props.index} className="mb-2" >
      <Card.Body className="d-flex">
        <div style={{width: '100%'}}>
          <Card.Text>
            {props.name}
          </Card.Text>
          <Card.Text>
            {props.description}
          </Card.Text>
          <Card.Text>
            {startDate} ~ {endDate}
          </Card.Text>
        </div>
        <div className="d-flex justify-content-end align-items-center" style={{width: '100%'}}>
          <Button variant="primary" onClick={()=>{
            props.changeTargetIndex(props.index);
            props.changeMode('EDIT');
          }}>수정</Button>
          <Button variant="danger" onClick={()=>{
            axios.delete(url + `post/project/${props.postId}`, props.header)
            .then(res=>{
              props.changeProjectData(res.data.res);
            }).catch(err=>{
              console.log(err);
            });
          }}>삭제</Button>
        </div>
      </Card.Body>
    </Card>
  );
  
}

export default ProjectInner;