import { React, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import url from '../url/http';

function ProjectForm(props) {

  const [startDate, setStartDate] = useState(new Date(props.startDate));
  const [endDate, setEndDate] = useState(new Date(props.endDate));

  return(
    <Form onSubmit={function(e) {
      e.preventDefault();
      if(props.formMode === '제출') {

        axios.post(url + 'post/project',{
          name: e.target.name.value,
          description: e.target.description.value,
          startDate: startDate,
          endDate: endDate
        }, props.header)
        .then((res)=>{
          props.changeProjectData(res.data.res);
        }).catch((err)=>{
          console.log(err);
        });
      } else {

        axios.put(url + `post/project/${props.postId}`,{
          name: e.target.name.value,
          description: e.target.description.value,
          startDate: startDate,
          endDate: endDate
        }, props.header)
        .then((res)=>{
          props.changeProjectData(res.data.res);
        }).catch((err)=>{
          console.log(err);
        });
      }
      
      props.changeMode('READ');
    }}>
      <Form.Group>
        <Form.Label>수상내역</Form.Label>
        <Form.Control type="text" name="name" defaultValue={props.name} />
      </Form.Group>
      <Form.Group>
        <Form.Label>상세내역</Form.Label>
        <Form.Control type="text" name="description" defaultValue={props.description} />
      </Form.Group>
      <div className="d-flex">
        <DatePicker
          dateFormat="yyyy-MM-dd"
          selected={startDate}
          onChange={date => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
        <DatePicker
          dateFormat="yyyy-MM-dd"
          selected={endDate}
          onChange={date => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </div>
      <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit">
          {props.formMode}
        </Button>
      </div>
    </Form>
  );

}

export default ProjectForm;