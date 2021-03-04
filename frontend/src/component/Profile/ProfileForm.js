import { React } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import url from '../../url/http';

function ProfileForm(props) {

  return(
    <Form onSubmit={function(e) {
      e.preventDefault();
      axios.put(url + `profile/post/${props.postId}`,{
          profileImage: e.target.profileImage.value,
          introduction: e.target.introduction.value
      }, props.header)
      .then((res)=>{
          props.changeProfileData(res.data.res);
      }).catch((err)=>{
          console.log(err);
      });
      props.changeMode('READ');
    }}>
      <Form.Group>
        <Form.Label>프로필 이미지</Form.Label>
        <Form.Control type="file" name="profileImage" value={props.image} />
      </Form.Group>
      <Form.Group>
        <Form.Label>한 줄 소개</Form.Label>
        <Form.Control type="textarea" value={props.introduction} name="introduction" />
      </Form.Group>
      <Button variant="primary" type="submit">
        저장
      </Button>
    </Form>
  );

}

export default ProfileForm;