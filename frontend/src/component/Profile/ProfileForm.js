import { React, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import url from '../../url/http';
import axios from 'axios';
import profileImage from '../../image/profile_default.png'
import { faHome, faCamera} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function ProfileForm(props) {

  const [imageChangeMode, setImageChangeMode] = useState('keep')
  const [imageFile, setImageFile] = useState('');
  const [nowImage, setNowImage] = useState(props.imageUrl);

  return(
    <Card
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
    <Card.Body>
      <Form onSubmit={function(e) {
        e.preventDefault();
        const data = new FormData();
        data.append('past_image', props.image)
        data.append('profile_image_change_mode', imageChangeMode)
        data.append('profile_image', imageFile);
        data.append('introduction', e.target.introduction.value);

        axios.put(url + `profile/post/${props.postId}`, data, props.header)
        .then((res)=>{
            props.changeProfileData(res.data.res[0]);
        }).catch((err)=>{
            console.log(err);
        });
        props.changeMode('READ');
      
      }}>
        <Form.Group className="d-flex flex-column align-items-center">
          <div style={{width: '15rem', height:'15rem'}}>
            <img src={nowImage} style={{borderRadius: '70%', width: '100%', height:'100%'}} alt="profile-img" />
          </div>
          <Button variant="mute">
            <FontAwesomeIcon icon={faCamera} size={'lg'} onClick={()=>{
              document.querySelector('#image-input').click();
            }} />
          </Button>
          <Form.File.Input id="image-input" name="profileImage" 
            onChange={(e)=>{
              setImageFile(e.target.files[0])
              setNowImage(URL.createObjectURL(e.target.files[0]));
              setImageChangeMode('change')
            }}
            style={{display: 'none'}} 
          />
          <div className="d-flex justify-content-center">
            <Button className="mr-2" variant="secondary" type="" onClick={()=>{
                setNowImage(profileImage);
                setImageChangeMode('delete');
              }}
              style={{
                fontFamily: 'Noto Sans KR, sans-serif',
                fontSize: '110%',
                fontWeight: 'bold'
              }}
            >
              Basic
            </Button>
            <Button variant="secondary" type="" onClick={()=>{
                setNowImage(props.imageUrl);
                setImageFile('')
                setImageChangeMode('keep');
              }}
              style={{
                fontFamily: 'Noto Sans KR, sans-serif',
                fontSize: '110%',
                fontWeight: 'bold'
              }}
            >
              Reset
            </Button>
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label
            style={{
              fontFamily: 'Noto Sans KR, sans-serif', 
              fontSize: '120%', 
              fontWeight: 'bold'
            }}
          >
            Bio
          </Form.Label>
          <Form.Control type="textarea" 
            defaultValue={props.introduction} name="introduction" 
            style={{
              fontFamily: 'Noto Sans KR, sans-serif',
              fontSize: '110%',
              fontWeight: 'bold'
            }}
          />
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" variant="secondary" type="submit"
            style={{
              fontFamily: 'Noto Sans KR, sans-serif',
              fontSize: '110%',
              fontWeight: 'bold'
            }}
          >
            Save
          </Button>
          <Button variant="secondary" type="" 
            onClick={()=>{
              props.changeMode('READ');
            }}
            style={{
              fontFamily: 'Noto Sans KR, sans-serif',
              fontSize: '110%',
              fontWeight: 'bold'
            }}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Card.Body>
    </Card>
  );

}

export default ProfileForm;