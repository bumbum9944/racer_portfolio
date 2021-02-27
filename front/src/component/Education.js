import { React, useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import url from '../url/http';
import EducationInner from './EducationInner';
import EducationForm from './EducationForm';

function Education() {
  var [mode, setMode] = useState('READ');
  var [eduData, setEduData] = useState([]);

  var accessToken = sessionStorage.getItem('token');
  
  const header = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }
  

  useEffect(()=>{
    axios.get(url + 'post/education', header)
    .then(response=>{
      setEduData(response.data.result);
      
    }).catch((e)=>{
      console.log(e)
    })
  }, []);

  var innerTag = '';
  var createForm = '';
  
  innerTag = eduData.map((data, index)=>
    <EducationInner key={index} changeEduData={(data)=>{
      setEduData(data)
    }} index={index} post_id={data[0]} schoolName={data[2]}
    major={data[3]} degree={data[1]} />
    // <Card key={index}>
    //   <Card.Body className="d-flex">
    //     <div style={{width: '100%'}}>
    //       <Card.Text>
    //         학교 : {data[2]}
    //       </Card.Text>
    //       <Card.Text>
    //         전공 : {data[3]}
    //       </Card.Text>
    //       <Card.Text>
    //         {data[1]}
    //       </Card.Text>
    //     </div>
    //     <div className="d-flex justify-content-end align-items-center" style={{width: '100%'}}>
    //       <Button variant="primary" data-index={index} data-schoolName={data[2]}
    //       data-major={data[3]} data-degree={data[1]} onClick={(e)=>{
    //         var newEdueData = [...eduData];
    //         newEdueData[Number(e.target.dataset.index)] = 
            
    //       }}>수정</Button>
    //       <Button variant="danger" onClick={()=>{
    //         axios.delete(url + `post/education/${data[0]}`, header)
    //         .then(res=>{
    //           setEduData(res.data.res);
    //         }).catch(err=>{
    //           console.log(err);
    //         });
    //       }}>삭제</Button>
    //     </div>
    //   </Card.Body>
    // </Card>
  )

  if(mode === 'CREATE') {
    createForm = <EducationForm changeEduData={(data)=>{
      setEduData(data)
    }} changeMode={(data)=>{
      setMode(data);
    }} />
    // <Form onSubmit={function(e) {
    //   e.preventDefault();
    //   axios.post(url + 'post/education',{
    //     schoolName: e.target.schoolName.value,
    //     major: e.target.major.value,
    //     degree: checkedItem
    //   }, {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`
    //     },
    //   })
    //   .then((res)=>{
    //     setEduData(res.data.res)
    //   }).catch((err)=>{
    //     console.log(err);
    //   });
      
    //   setMode('READ');
    //   setSchoolName('');
    //   setMajor('');
    //   setCheckedItem('');
    // }}>
    //   <Form.Group>
    //     <Form.Label>학교</Form.Label>
    //     <Form.Control type="text" name="schoolName" value={schoolName} placeholder="학교 이름을 적어주세요" onChange={function(e) {
    //       setSchoolName(e.target.value)
    //     }} />
    //   </Form.Group>
    //   <Form.Group>
    //     <Form.Label>전공</Form.Label>
    //     <Form.Control type="text" name="major" value={major} placeholder="전공을 적어주세요" onChange={function(e) {
    //       setMajor(e.target.value)
    //     }} />
    //   </Form.Group>
    //   <Form.Group>
    //     <Form.Check inline label="학사학위" type='radio' value="학사" id='radio-1' checked={checkedItem === '학사'} onChange={changeSelect} />
    //     <Form.Check inline label="석사학위" type='radio' value="석사" id='radio-2' checked={checkedItem === '석사'} onChange={changeSelect} />
    //     <Form.Check inline label="박사학위" type='radio' value="박사" id='radio-3' checked={checkedItem === '박사'} onChange={changeSelect} />
    //   </Form.Group>
    //   <Button variant="primary" type="submit">
    //     Submit
    //   </Button>
    // </Form>
  }
  
  return (
    <div>
      <Card style={{ width: '30rem' }}>
        <Card.Body>
          <Card.Title>학력</Card.Title>
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
    </div>
  );
}

export default Education;