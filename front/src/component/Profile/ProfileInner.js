import { React } from 'react';
import { Card, Button } from 'react-bootstrap';
import { faHome} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function ProfileInner(props) {

  let buttonTag;
  
  if (props.currentUser === props.targetId) {
    buttonTag = 
    <div className="d-flex justify-content-end align-items-center" style={{width: '100%'}}>
      <Button variant="secondary" onClick={()=>{
        props.changeMode('EDIT');
      }}>Edit</Button>
    </div>
  } else {
    buttonTag = <></>
  }

  let profileImage = 
    <div className="d-flex justify-content-center align-items-center" style={{width: '15rem', height:'15rem'}}>
      <img src={props.imageUrl} style={{borderRadius: '70%', width: '100%', height:'100%'}} alt="profile-img" />
    </div>

  return(
    <Card key={props.index} className="mb-2"
      style={{
        height: '35rem',
      }}
    >
      <Card.Title
        className="mt-3 ml-4" 
        style={{
          height: '2rem',
          fontFamily: 'Noto Sans KR, sans-serif',
          fontSize: '120%',
          fontWeight: 'bold'
        }}
      >
        {props.userName}'s <FontAwesomeIcon icon={faHome} />
      </Card.Title>
      <Card.Body className="d-flex flex-column align-items-center">
        {profileImage}
        <Card.Text className="my-5 d-flex justify-content-center" 
          style={{
              width: '90%', 
              fontFamily: 'Noto Sans KR, sans-serif', 
              fontSize: '130%', 
              fontWeight: 'bold'
            }}
          >
          {props.introduction}
        </Card.Text>
        {buttonTag}
      </Card.Body>
    </Card>
  );
  
}

export default ProfileInner;