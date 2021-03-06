import { React, useState, useEffect } from 'react';
import url from '../../url/http';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import AwardInner from './AwardInner';
import AwardForm from './AwardForm';


function Award(props) {

  var [targetIndex, setTargetIndex] = useState('');
  var [mode, setMode] = useState('READ');
  var [awardData, setAwardData] = useState([]);

  useEffect(()=>{
    if (awardData.length === 0) {
      if (props.currentUser === props.targetId) {
        axios.get(url + `award/${props.currentUser}`)
        .then(response=>{
          setAwardData(response.data.result);
          
        }).catch((e)=>{
          console.log(e)
        })
      } else {
        axios.get(url + `award/${props.targetId}`)
        .then(response=>{
          setAwardData(response.data.result);
          
        }).catch((e)=>{
          console.log(e)
        })
      }
    }
  }, [props, awardData.length]);

  const header = {
    headers: {
      Authorization: `Bearer ${props.accessToken}`
    }
  }

  var createForm = '';
  
  var innerTag = awardData.map((data, index)=>
    <AwardInner key={index} changeTargetIndex={(data)=>{
      setTargetIndex(data);
    }} changeAwardData={(data)=>{
      setAwardData(data);
    }} changeMode={(data)=>{
      setMode(data);
    }} index={index} postId={data[0]} name={data[1]}
    description={data[2]} header={header} 
    targetId={props.targetId}
    currentUser={props.currentUser}
    />
  )

  let buttonTag
  if (props.currentUser === props.targetId) {
    buttonTag = 
    <div className="d-flex justify-content-end">
      <Button variant="primary" onClick={function(){
        if(mode === 'READ') {
          setMode('CREATE');
        } else {
          setMode('READ');
        }
      }}>
        추가
      </Button>
    </div>
  } else {
    buttonTag = <></>
  }

  if(mode === 'CREATE') {
    createForm = <AwardForm formMode="제출" name="" description="" 
    header={header}
    changeAwardData={function(data) {
      setAwardData(data)
    }} changeMode={(data)=>{
      setMode(data);
    }} />
  } else if(mode === 'EDIT') {
    createForm = <AwardForm formMode="저장"
    postId = {awardData[targetIndex][0]} 
    name={awardData[targetIndex][1]} 
    description={awardData[targetIndex][2]}
    header={header} 
    changeAwardData={function(data) {
      setAwardData(data)
    }} changeMode={(data)=>{
      setMode(data);
    }} />
  }

  return (
    <Card style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title className="portfolio-title" style={{
          fontFamily: 'Noto Sans KR, sans-serif',
          fontSize: '250%'
      }}>Award</Card.Title>
          {innerTag}
          {createForm}
          {buttonTag}
        </Card.Body>
      </Card>
  );

}

export default Award;