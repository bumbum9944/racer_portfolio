import { React, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import url from '../url/http';

function EducationForm(props) {

  var [checkedItem, setCheckedItem] = useState('')
  var [schoolName, setSchoolName] = useState('');
  var [major, setMajor] = useState('');

  var accessToken = sessionStorage.getItem('token');

  const header = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }

  function changeSelect(e) {
    setCheckedItem(e.target.value);
  }

  return(
    <Form onSubmit={function(e) {
      e.preventDefault();
      axios.post(url + 'post/education',{
        schoolName: e.target.schoolName.value,
        major: e.target.major.value,
        degree: checkedItem
      }, header)
      .then((res)=>{
        props.changeEdueData(res.data.res);
      }).catch((err)=>{
        console.log(err);
      });
      
      props.changeMode('READ');
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
  );
}

export default EducationForm;