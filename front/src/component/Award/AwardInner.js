import { React } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import url from '../../url/http';
import { faPen, faTrashAlt} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function AwardInner(props) {

  let buttonTag
  
  if (props.currentUser === props.targetId) {
    buttonTag =
    <div className="d-flex justify-content-end align-items-center" style={{width: '100%'}}>
      <Button variant="" onClick={()=>{
        props.changeTargetIndex(props.index);
        props.changeMode('EDIT');
      }}>
        <FontAwesomeIcon icon={faPen} size='lg' />
      </Button>
      <Button variant="" onClick={()=>{
        axios.delete(url + `award/post/${props.postId}`, props.header)
        .then(res=>{
          props.changeAwardData(res.data.res);
        }).catch(err=>{
          console.log(err);
        });
      }}>
        <FontAwesomeIcon icon={faTrashAlt} size='lg' />
      </Button>
    </div> 
  } else {
    buttonTag = <></>
  }

  return(
    <Card key={props.index} className="mb-2" >
      <Card.Body className="d-flex">
        <div style={{width: '100%'}}>
          <Card.Text
            style={{
              fontFamily: 'Noto Sans KR, sans-serif',
              fontSize: '120%',
              fontWeight: 'bold'
            }}
          >
            수상내역 : {props.name}
          </Card.Text>
          <Card.Text
            style={{
              fontFamily: 'Noto Sans KR, sans-serif',
              fontSize: '120%',
              fontWeight: 'bold'
            }}
          >
            {props.description}
          </Card.Text>
        </div>
        {buttonTag}
      </Card.Body>
    </Card>
  );

}

export default AwardInner;