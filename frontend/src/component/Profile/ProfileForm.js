import { React, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import url from '../../url/http';
import axios from 'axios';
import profileImage from '../../image/profile_default.png'

function ProfileForm(props) {

  const [imageFile, setImageFile] = useState('');
  const [nowImage, setNowImage] = useState(props.imageUrl);

  return(
    <Form onSubmit={function(e) {
      e.preventDefault();
      const data = new FormData();
      data.append('profile_image', imageFile);
      data.append('introduction', props.introduction);

      axios.put(url + `profile/post/${props.postId}`, data, props.header)
      .then((res)=>{
          props.changeProfileData(res.data.res[0]);
      }).catch((err)=>{
          console.log(err);
      });
      props.changeMode('READ');
     
    }}>
      <Form.Group>
        <div style={{width: '15rem', height:'15rem'}}>
          <img src={nowImage} style={{borderRadius: '70%', width: '100%', height:'100%'}} alt="profile-img" />
        </div>
        <Form.File.Input name="profileImage" onChange={(e)=>{
          setImageFile(e.target.files[0])
        }} />
        <Button variant="primary" type="" onClick={()=>{
            setNowImage(profileImage);
            setImageFile('');
          }}
        >
          사진삭제
        </Button>
      </Form.Group>
      <Form.Group>
        <Form.Label>한 줄 소개</Form.Label>
        <Form.Control type="textarea" defaultValue={props.introduction} name="introduction" />
      </Form.Group>
      <Button variant="primary" type="submit">
        저장
      </Button>
      <Button variant="primary" type="" onClick={()=>{
        props.changeMode('READ');
      }}>
        취소
      </Button>
    </Form>
  );

}

export default ProfileForm;