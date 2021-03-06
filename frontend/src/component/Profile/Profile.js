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
  const [imageUrl, setImageUrl] = useState('');
  // const [userData, setUserData] = useState([]);

  
  useEffect(()=>{
    if (profileData.length === 0) {
      if (props.currentUser === props.targetId) {
        axios.get(url + `profile/${props.currentUser}`)
        .then(response=>{
          if (response.data.result[0][4] === 'null' || response.data.result[0][4] === null) {  
            setImageUrl(imgfile);
          } else {
            setImageUrl(url + 'image/' + response.data.result[0][4]);
          }
          setProfileData(response.data.result[0])
        }).catch((e)=>{
          console.log(e)
        })
      } else {
        axios.get(url + `profile/${props.targetId}`)
        .then(response=>{
          if (response.data.result[0][4] === 'null' || response.data.result[0][4] === null) {  
            setImageUrl(imgfile);
          } else {
            setImageUrl(url + 'image/' + response.data.result[0][4]);
          }
          setProfileData(response.data.result[0])
        }).catch((e)=>{
          console.log(e)
        })
      }
    }
  }, [props, profileData.length]);

  // useEffect(()=>{
  //   if (userData.length === 0) {
  //     if (props.currentUser === props.targetId) {
  //       axios.get(url + `account/${props.currentUser}`)
  //       .then(response=>{
  //         setUserData(response.data.result);
          
  //       }).catch((e)=>{
  //         console.log(e)
  //       })
  //     } else {
  //       axios.get(url + `account/${props.targetId}`)
  //       .then(response=>{
  //         setUserData(response.data.result);
          
  //       }).catch((e)=>{
  //         console.log(e)
  //       })
  //     }
  //   }
  // }, [props, userData.length])
  
  const header = {
    headers: {
      Authorization: `Bearer ${props.accessToken}`
    }
  }
  
  // let imageUrl

  // if (profileData[4] === 'null' || profileData[4] === null) {  
  //   imageUrl = imgfile;
  // } else {
  //   imageUrl = url + 'image/' + profileData[4];
  // }

  var innerTag

  if(mode === 'READ') {
    innerTag = <ProfileInner 
      postId={profileData[2]}
      userName={profileData[0]} 
      introduction={profileData[3]}
      image={profileData[4]}
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
      postId={profileData[2]} 
      introduction={profileData[3]}
      image={profileData[4]}
      imageUrl={imageUrl}
      header={header}
      changeProfileData={(data)=>{
        setProfileData(data);
        if (data[4] === 'null' || data[4] === null) {  
          setImageUrl(imgfile);
        } else {
          setImageUrl(url + 'image/' + data[4]);
        }
      }}
      changeMode={(data)=>{
        setMode(data);
      }} 
    />
  }

  return (
    <Card style={{ width: '25rem', height: '100%' }}>
      <Card.Body>
        <Card.Title className="portfolio-title" style={{
          fontFamily: 'Noto Sans KR, sans-serif',
          fontSize: '250%'
      }}>Profile</Card.Title>
        {innerTag}
      </Card.Body>
    </Card>
  );

}

export default Profile;