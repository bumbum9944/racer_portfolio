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

  let profileImage = 
                    <div style={{width: '15rem', height:'15rem'}}>
                      <img src={props.imageUrl} style={{borderRadius: '70%', width: '100%', height:'100%'}} alt="profile-img" />
                    </div>

  return(
    <Card key={props.index} className="mb-2" >
      <Card.Body className="">
        {profileImage}
        <Card.Text>
          소개 : {props.introduction}
        </Card.Text>
        {buttonTag}
      </Card.Body>
    </Card>
  );
  
}

export default ProfileInner;