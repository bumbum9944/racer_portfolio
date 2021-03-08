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

  let introductionTag;
  if (props.introduction) {
    introductionTag = props.introduction
  } else {
    introductionTag = "아직 소개 글이 없어요..."
  }
  
  let imgTag = 
  <Card.Body className="d-flex justify-content-center">
    <div className="d-flex justify-content-center align-items-center" style={{width: '10rem', height:'10rem'}}>
      <img src={nowImage} style={{borderRadius: '70%', width: '100%', height:'100%'}} alt="profile-img" />
    </div>
  </Card.Body>
  return(
    <Col col="4" className="d-flex justify-content-center my-2">
      <Card className="d-flex flex-column align-items-center" style={{ width: '18rem' }}>
        {imgTag}
        <Card.Body className="d-flex flex-column align-items-center">
          <Card.Title 
            style={{
              fontFamily: 'Noto Sans KR, sans-serif',
              fontSize: '110%',
              fontWeight: 'bold'
            }}
          >
            {props.name}
          </Card.Title>
          <Card.Text
            style={{
              fontFamily: 'Noto Sans KR, sans-serif',
              fontSize: '110%',
              fontWeight: 'bold'
            }}
          >
            {introductionTag}
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