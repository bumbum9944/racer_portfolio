import { React, useState, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import url from '../url/http';

function Education() {
  var [mode, setMode] = useState('READ');
  var [checkedItem, setCheckedItem] = useState('')
  var [schoolName, setSchoolName] = useState('');
  var [major, setMajor] = useState('');
  var [eduData, setEduData] = useState([]);

  var accessToken = sessionStorage.getItem('token');
  
  

  useEffect(()=>{
    axios.get(url + 'post/education', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response=>{
      setEduData(response.data.result);
      
    }).catch((e)=>{
      console.log(e)
    })
  }, []);

  var innerTag = '';
  var createForm = '';
  
  innerTag = eduData.map((data, index)=>
    <Card.Body key={index}>
      <Card.Text>
        학교 : {data[2]}
      </Card.Text>
      <Card.Text>
        전공 : {data[3]}
      </Card.Text>
      <Card.Text>
        {data[1]}
      </Card.Text>
    </Card.Body>
  )

  function changeSelect(e) {
    setCheckedItem(e.target.value);
  }

  if(mode === 'CREATE') {
    createForm = <Form onSubmit={function(e) {
      e.preventDefault();
      axios.post(url + 'post/education',{
        schoolName: e.target.schoolName.value,
        major: e.target.major.value,
        degree: checkedItem
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
      })
      .then((res)=>{
        setEduData(res.data.res)
      }).catch((err)=>{
        console.log(err);
      });
      
      setMode('READ');
      setSchoolName('');
      setMajor('');
      setCheckedItem('');
    }}>
      <Form.Group>
        <Form.Label>학교</Form.Label>
        <Form.Control type="text" name="schoolName" value={schoolName} placeholder="학교 이름을 적어주세요" onChange={function(e) {
          setSchoolName(e.target.value)
        }} />
      </Form.Group>
      <Form.Group>
        <Form.Label>전공</Form.Label>
        <Form.Control type="text" name="major" value={major} placeholder="전공을 적어주세요" onChange={function(e) {
          setMajor(e.target.value)
        }} />
      </Form.Group>
      <Form.Group>
        <Form.Check inline label="학사학위" type='radio' value="학사" id='radio-1' checked={checkedItem === '학사'} onChange={changeSelect} />
        <Form.Check inline label="석사학위" type='radio' value="석사" id='radio-2' checked={checkedItem === '석사'} onChange={changeSelect} />
        <Form.Check inline label="박사학위" type='radio' value="박사" id='radio-3' checked={checkedItem === '박사'} onChange={changeSelect} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  }
  
  return (
    <div>
      <Card style={{ width: '30rem' }}>
        <Card.Body>
          <Card.Title>학력</Card.Title>
          {innerTag}
          {createForm}
        </Card.Body>
      </Card>
      <Button variant="primary" onClick={function(){
        setMode('CREATE');
      }}>
                  추가
      </Button>
    </div>
  );
}

export default Education;