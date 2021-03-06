import { React, useState, useEffect } from 'react';
import url from '../../url/http';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import LicenseInner from './LicenseInner';
import LicenseForm from './LicenseForm';


function License(props) {

  var [targetIndex, setTargetIndex] = useState('');
  var [mode, setMode] = useState('READ');
  var [licenseData, setLicenseData] = useState([]);

  useEffect(()=>{
    if (licenseData.length === 0) {
      if (props.currentUser === props.targetId) {
        axios.get(url + `license/${props.currentUser}`)
        .then(response=>{
          setLicenseData(response.data.result);
          
        }).catch((e)=>{
          console.log(e)
        })
      } else {
        axios.get(url + `license/${props.targetId}`)
        .then(response=>{
          setLicenseData(response.data.result);
          
        }).catch((e)=>{
          console.log(e)
        })
      }
    }
  }, [props, licenseData.length]);

  const header = {
    headers: {
      Authorization: `Bearer ${props.accessToken}`
    }
  }

  var createForm = '';
  
  var innerTag = licenseData.map((data, index)=>
    <LicenseInner 
      key={index} 
      changeTargetIndex={(data)=>{
        setTargetIndex(data);
      }} 
      changeLicenseData={(data)=>{
        setLicenseData(data);
      }} 
      changeMode={(data)=>{
        setMode(data);
      }} 
      index={index} 
      postId={data[0]} 
      name={data[1]}
      issuer={data[2]} 
      acquisitionDate={data[3]}
      header={header} 
      targetId={props.targetId}
      currentUser={props.currentUser}
    />
  )
  
  function dateToYear(date) {
    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    if (month < 10)  {
        month = '0' + month;
    }

    var dt = date.getDate();
    if (dt < 10) {
        dt = '0' + dt;
    }
    
    return year + '-' + month + '-' + dt;
  }

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

  let now = dateToYear(new Date());
  if(mode === 'CREATE') {
    createForm = <LicenseForm formMode="제출" name="" 
    issuer=""
    acquisitionDate={now}
    header={header} 
    changeLicenseData={function(data) {
      setLicenseData(data)
    }} changeMode={(data)=>{
      setMode(data);
    }} />
  } else if(mode === 'EDIT') {
    createForm = <LicenseForm formMode="저장"
    postId = {licenseData[targetIndex][0]} 
    name={licenseData[targetIndex][1]} 
    issuer={licenseData[targetIndex][2]}
    acquisitionDate={licenseData[targetIndex][3]}
    header={header} 
    changeLicenseData={function(data) {
      setLicenseData(data)
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
      }}>Certificate</Card.Title>
          {innerTag}
          {createForm}
          {buttonTag}
        </Card.Body>
      </Card>
  );

}

export default License;