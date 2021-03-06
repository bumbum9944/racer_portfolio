import { React, useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import url from '../../url/http';
import EducationInner from './EducationInner';
import EducationForm from './EducationForm';

function Education(props) {

  var [targetIndex, setTargetIndex] = useState('');
  var [mode, setMode] = useState('READ');
  var [eduData, setEduData] = useState([]);
  
  let header

  useEffect(()=>{
    if (eduData.length === 0) {
      if (props.currentUser === props.targetId) {
        axios.get(url + `education/${props.currentUser}`)
        .then(response=>{
          setEduData(response.data.result);
          
        }).catch((e)=>{
          console.log(e)
        })
      } else {
        axios.get(url + `education/${props.targetId}`)
        .then(response=>{
          setEduData(response.data.result);
          
        }).catch((e)=>{
          console.log(e)
        })
      }
    }
  }, [props, eduData.length]);

  header = {
    headers: {
      Authorization: `Bearer ${props.accessToken}`
    }
  }

  var createForm = '';
  
  var innerTag = eduData.map((data, index)=>
    <EducationInner key={index} changeTargetIndex={(data)=>{
      setTargetIndex(data);
    }} changeEduData={(data)=>{
      setEduData(data);
    }} changeMode={(data)=>{
      setMode(data);
    }} index={index} postId={data[0]} schoolName={data[2]}
    major={data[3]} degree={data[1]} header={header} 
    targetId={props.targetId}
    currentUser={props.currentUser}
    />
  )

  let buttonTag
  if (props.currentUser === props.targetId) {
    buttonTag = 
    <div className="d-flex justify-content-center">
      <Button variant="secondary" 
        onClick={function(){
          setMode('CREATE');
        }}
        style={{
          fontSize: "110",
          fontWeight: 'bold'
        }}
      >
        +
      </Button>
    </div>
  } else {
    buttonTag = <></>
  }

  if(mode === 'CREATE') {
    createForm = <EducationForm formMode="Submit" schoolName="" major="" checkedItem=""
    header={header}
    changeEduData={function(data) {
      setEduData(data)
    }} changeMode={(data)=>{
      setMode(data);
    }} />
  } else if(mode === 'EDIT') {
    createForm = <EducationForm formMode="Save"
    postId = {eduData[targetIndex][0]} 
    schoolName={eduData[targetIndex][2]} 
    major={eduData[targetIndex][3]} 
    checkedItem={eduData[targetIndex][1]} 
    header={header}
    changeEduData={function(data) {
      setEduData(data)
    }} changeMode={(data)=>{
      setMode(data);
    }} />
  }
  
  return (
    <div>
      <Card style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title className="portfolio-title" style={{
          fontFamily: 'Noto Sans KR, sans-serif',
          fontSize: '250%'
      }}>Education</Card.Title>
          {innerTag}
          {createForm}
          {buttonTag}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Education;