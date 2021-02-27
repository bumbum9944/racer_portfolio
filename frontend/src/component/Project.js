import { React, useState, useEffect } from 'react';
import url from '../url/http';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import ProjectInner from './ProjectInner';
import ProjectForm from './ProjectForm';


function Project(props) {

  var [targetIndex, setTargetIndex] = useState('');
  var [mode, setMode] = useState('READ');
  var [projectData, setProjectData] = useState([]);

  useEffect(()=>{
    axios.get(url + 'post/project', {
      headers: {
        Authorization: `Bearer ${props.accessToken}`
      }
    })
    .then(response=>{
      setProjectData(response.data.result);
      
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
  
  var innerTag = projectData.map((data, index)=>
    <ProjectInner key={index} changeTargetIndex={(data)=>{
      setTargetIndex(data);
    }} changeProjectData={(data)=>{
      setProjectData(data);
    }} changeMode={(data)=>{
      setMode(data);
    }} index={index} postId={data[0]} name={data[1]}
    description={data[2]} startDate={data[3]} endDate={data[4]}
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
    createForm = <ProjectForm formMode="제출" name="" 
    description=""
    startDate={now} 
    endDate={now}
    header={header}
    changeProjectData={function(data) {
      setProjectData(data)
    }} changeMode={(data)=>{
      setMode(data);
    }} />
  } else if(mode === 'EDIT') {
    createForm = <ProjectForm formMode="저장"
    postId = {projectData[targetIndex][0]} 
    name={projectData[targetIndex][1]} 
    description={projectData[targetIndex][2]}
    startDate={projectData[targetIndex][3]} 
    endDate={projectData[targetIndex][4]}
    header={header}
    changeProjectData={function(data) {
      setProjectData(data)
    }} changeMode={(data)=>{
      setMode(data);
    }} />
  }

  return (
    <Card style={{ width: '50rem' }}>
        <Card.Body>
          <Card.Title>프로젝트</Card.Title>
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

export default Project;