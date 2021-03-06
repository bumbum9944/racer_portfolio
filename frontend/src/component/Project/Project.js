import { React, useState, useEffect } from 'react';
import url from '../../url/http';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import ProjectInner from './ProjectInner';
import ProjectForm from './ProjectForm';


function Project(props) {

  var [targetIndex, setTargetIndex] = useState('');
  var [mode, setMode] = useState('READ');
  var [projectData, setProjectData] = useState([]);

  useEffect(()=>{
    if (projectData.length === 0) {
      if (props.currentUser === props.targetId) {
        axios.get(url + `project/${props.currentUser}`)
        .then(response=>{
          setProjectData(response.data.result);
          
        }).catch((e)=>{
          console.log(e)
        })
      } else {
        axios.get(url + `project/${props.targetId}`)
        .then(response=>{
          setProjectData(response.data.result);
          
        }).catch((e)=>{
          console.log(e)
        })
      }
    }
  }, [props, projectData.length]);

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

  let now = dateToYear(new Date());
  if(mode === 'CREATE') {
    createForm = <ProjectForm formMode="Submit" name="" 
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
    createForm = <ProjectForm formMode="Save"
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
    <Card className="my-4" style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title className="portfolio-title" style={{
          fontFamily: 'Noto Sans KR, sans-serif',
          fontSize: '250%'
      }}>Project</Card.Title>
          {innerTag}
          {createForm}
          {buttonTag}
        </Card.Body>
      </Card>
  );

}

export default Project;