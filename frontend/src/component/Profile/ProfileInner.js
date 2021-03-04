import { React} from 'react';
import { Card, Button } from 'react-bootstrap';

function ProfileInner(props) {

  let buttonTag;
  
  if (props.currentUser === props.targetId) {
    buttonTag = 
    <div className="d-flex justify-content-end align-items-center" style={{width: '100%'}}>
      <Button variant="primary" onClick={()=>{
        props.changeMode('EDIT');
      }}>수정</Button>
    </div>
  } else {
    buttonTag = <></>
  }

  let profileImage = <img src={props.image} style={{borderRadius: '70%', width: '60%'}} alt="profile-img" />

  return(
    <Card key={props.index} className="mb-2" >
      {profileImage}
      <Card.Body className="d-flex">
        <Card.Text>
          {props.introduction}
        </Card.Text>
        {buttonTag}
      </Card.Body>
    </Card>
  );
  
}

export default ProfileInner;