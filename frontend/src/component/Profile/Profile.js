import { React, useState, useEffect } from 'react';
import url from '../../url/http';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import ProfileInner from './ProfileInner';
import ProfileForm from './ProfileForm';
import imgfile from '../../image/profile_default.png'


function Profile(props) {

  let [mode, setMode] = useState('READ');
  // const [postId, setPostId] = useState('')
  // const [imageUrl, setImageUrl] = useState(imgfile);
  // const [introduction, setIntroduction] = useState('');
  const [profileData, setProfileData] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(()=>{
    if (props.currentUser === props.targetId) {
      axios.get(url + `profile/${props.currentUser}`)
      .then(response=>{
        setProfileData(response.data.result[0])
      }).catch((e)=>{
        console.log(e)
      })
    } else {
      axios.get(url + `profile/${props.targetId}`)
      .then(response=>{
        setProfileData(response.data.result[0])
      }).catch((e)=>{
        console.log(e)
      })
    }
  }, [props]);

  useEffect(()=>{
    if (userData.length === 0) {
      if (props.currentUser === props.targetId) {
        axios.get(url + `account/${props.currentUser}`)
        .then(response=>{
          setUserData(response.data.result);
          
        }).catch((e)=>{
          console.log(e)
        })
      } else {
        axios.get(url + `account/${props.targetId}`)
        .then(response=>{
          setUserData(response.data.result);
          
        }).catch((e)=>{
          console.log(e)
        })
      }
    }
  }, [props, userData.length])
  
  const header = {
    headers: {
      Authorization: `Bearer ${props.accessToken}`
    }
  }
  
  let imageUrl
  if (profileData[2]) {
    imageUrl = url + profileData[2];
  } else {
    imageUrl = imgfile;
  }

  var innerTag

  if(mode === 'READ') {
    innerTag = <ProfileInner 
      postId={profileData[0]}
      userName={userData[0]}
      userEmail={userData[1]} 
      introduction={profileData[1]}
      imageUrl={imageUrl}
      currentUser={props.currentUser}
      targetId={props.targetId}
      changeMode={(data)=>{
        setMode(data);
      }} 
    />
  } else if(mode === 'EDIT') {
    innerTag = 
    <ProfileForm
      postId={profileData[0]} 
      introduction={profileData[1]}
      imageUrl={imageUrl}
      header={header}
      changeProfileData={(data)=>{
        setProfileData(data);
      }}
      changeMode={(data)=>{
        setMode(data);
      }} 
    />
  }

  return (
    <Card style={{ width: '25rem' }}>
      <Card.Body>
        <Card.Title>Profile</Card.Title>
        <Card.Text>
          {userData[0]}
        </Card.Text>
        {innerTag}
      </Card.Body>
    </Card>
  );

}

export default Profile;