import { React } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import url from '../../url/http';

function LicenseInner(props) {

  let buttonTag
  
  if (props.currentUser === props.targetId) {
    buttonTag = 
    <div className="d-flex justify-content-end align-items-center" style={{width: '100%'}}>
      <Button variant="primary" onClick={()=>{
        props.changeTargetIndex(props.index);
        props.changeMode('EDIT');
      }}>수정</Button>
      <Button variant="danger" onClick={()=>{
        axios.delete(url + `license/post/${props.postId}`, props.header)
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

  let acquisitionDate = dateToYear(new Date(props.acquisitionDate))

  return(
    <Card key={props.index} className="mb-2" >
      <Card.Body className="d-flex">
        <div style={{width: '100%'}}>
          <Card.Text>
            {props.name}
          </Card.Text>
          <Card.Text>
            {props.issuer}
          </Card.Text>
          <Card.Text>
            발급일 : {acquisitionDate}
          </Card.Text>
        </div>
        {buttonTag}
      </Card.Body>
    </Card>
  );
  
}

export default LicenseInner;