import React from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { faHome} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import url from '../../../url/http';
import imgfile from '../../../image/profile_default.png'

function NetworkInner(props) {

  let history = useHistory();

  let nowImage;

  if (props.image === 'null' || props.image === null) {  
    nowImage = imgfile;
  } else {
    nowImage = url + 'image/' + props.image
  } 
  
  let imgTag = 
  <Card.Body className="d-flex justify-content-center">
    <img src={nowImage} style={{borderRadius: '70%', width: '60%'}} alt="profile-img" />
  </Card.Body>
  return(
    <Col col="4" className="d-flex justify-content-center my-2">
      <Card className="d-flex flex-column align-items-center" style={{ width: '18rem' }}>
        {imgTag}
        <Card.Body className="d-flex flex-column align-items-center">
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>
            {props.email}
          </Card.Text>
          <Button variant="mute" onClick={()=>{
            history.push(`mypage/${props.userId}`)
          }}>
            <FontAwesomeIcon icon={faHome} size='lg' />
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );

}

export default NetworkInner;