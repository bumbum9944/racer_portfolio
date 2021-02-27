import { React, useState, useEffect } from 'react';
import url from '../url/http';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import LicenseInner from './LicenseInner';
import LicenseForm from './LicenseForm';


function License(props) {

  var [targetIndex, setTargetIndex] = useState('');
  var [mode, setMode] = useState('READ');
  var [licenseData, setLicenseData] = useState([]);

  useEffect(()=>{
    axios.get(url + 'post/license', {
      headers: {
        Authorization: `Bearer ${props.accessToken}`
      }
    })
    .then(response=>{
      setLicenseData(response.data.result);
      
    }).catch((e)=>{
      console.log(e)
    })
  }, [props.accessToken]);

  const header = {
    headers: {
      Authorization: `Bearer ${props.accessToken}`
    }
  }

  var createForm = '';
  
  var innerTag = licenseData.map((data, index)=>
    <LicenseInner key={index} changeTargetIndex={(data)=>{
      setTargetIndex(data);
    }} changeLicenseData={(data)=>{
      setLicenseData(data);
    }} changeMode={(data)=>{
      setMode(data);
    }} index={index} postId={data[0]} name={data[1]}
    description={data[2]} acquisitionDate={data[3]}
    header={header} />
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
    <Card style={{ width: '50rem' }}>
        <Card.Body>
          <Card.Title>자격증</Card.Title>
          {innerTag}
          {createForm}
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
        </Card.Body>
      </Card>
  );

}

export default License;