import { React, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import url from '../url/http';

function EducationForm(props) {
  var [checkedItem, setCheckedItem] = useState(props.checkedItem)
  var [schoolName, setSchoolName] = useState(props.schoolName);
  var [major, setMajor] = useState(props.major);

  function changeSelect(e) {
    setCheckedItem(e.target.value);
  }

  return(
    <Form onSubmit={function(e) {
      e.preventDefault();
      if(props.formMode === '제출') {

        axios.post(url + 'post/education',{
          schoolName: e.target.schoolName.value,
          major: e.target.major.value,
          degree: checkedItem
        }, props.header)
        .then((res)=>{
          props.changeEduData(res.data.res);
        }).catch((err)=>{
          console.log(err);
        });
      } else {

        axios.put(url + `post/education/${props.postId}`,{
          schoolName: e.target.schoolName.value,
          major: e.target.major.value,
          degree: checkedItem
        }, props.header)
        .then((res)=>{
          props.changeEduData(res.data.res);
        }).catch((err)=>{
          console.log(err);
        });
      }
      
      props.changeMode('READ');
      setSchoolName('');
      setMajor('');
      setCheckedItem('');
    }}>
      <Form.Group>
        <Form.Label>학교</Form.Label>
        <Form.Control type="text" name="schoolName" value={schoolName} onChange={function(e) {
          setSchoolName(e.target.value)
        }} />
      </Form.Group>
      <Form.Group>
        <Form.Label>전공</Form.Label>
        <Form.Control type="text" name="major" value={major} onChange={function(e) {
          setMajor(e.target.value)
        }} />
      </Form.Group>
      <Form.Group>
        <Form.Check inline label="학사학위" type='radio' value="학사" id='radio-1' checked={checkedItem === '학사'} onChange={changeSelect} />
        <Form.Check inline label="석사학위" type='radio' value="석사" id='radio-2' checked={checkedItem === '석사'} onChange={changeSelect} />
        <Form.Check inline label="박사학위" type='radio' value="박사" id='radio-3' checked={checkedItem === '박사'} onChange={changeSelect} />
      </Form.Group>
      <Button variant="primary" type="submit">
        {props.formMode}
      </Button>
    </Form>
  );

}

export default EducationForm;