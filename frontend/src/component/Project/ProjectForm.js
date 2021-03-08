import { React, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import url from '../../url/http';

function ProjectForm(props) {

  const [startDate, setStartDate] = useState(new Date(props.startDate));
  const [endDate, setEndDate] = useState(new Date(props.endDate));

  return(
    <Card>
      <Card.Body>
        <Form onSubmit={function(e) {
          e.preventDefault();
          if(props.formMode === 'Submit') {

            axios.post(url + 'project/post',{
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

            axios.put(url + `project/post/${props.postId}`,{
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
            <Form.Label
              style={{
                fontFamily: 'Noto Sans KR, sans-serif',
                fontSize: '120%',
                fontWeight: 'bold'
              }}
            >
              프로젝트명
            </Form.Label>
            <Form.Control type="text" name="name" 
              defaultValue={props.name} 
              style={{
                fontFamily: 'Noto Sans KR, sans-serif',
                fontSize: '110%',
                fontWeight: 'bold'
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label
              style={{
                fontFamily: 'Noto Sans KR, sans-serif',
                fontSize: '110%',
                fontWeight: 'bold'
              }}
            >
              상세내역
            </Form.Label>
            <Form.Control type="text" name="description" 
              defaultValue={props.description} 
              style={{
                fontFamily: 'Noto Sans KR, sans-serif',
                fontSize: '110%',
                fontWeight: 'bold'
              }}
            />
          </Form.Group>
          <div className="d-flex">
            <DatePicker
              dateFormat="yyyy-MM-dd"
              selected={startDate}
              onChange={date => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
            <DatePicker
              dateFormat="yyyy-MM-dd"
              selected={endDate}
              onChange={date => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </div>
          <div className="d-flex justify-content-end">
            <Button className="mr-2" variant="secondary" type="submit"
              style={{
                fontFamily: 'Noto Sans KR, sans-serif',
                fontSize: '110%',
                fontWeight: 'bold'
              }}
            >
              {props.formMode}
            </Button>
            <Button variant="secondary" type="submit" 
              onClick={()=>{
                props.changeMode('READ');
              }}
              style={{
                fontFamily: 'Noto Sans KR, sans-serif',
                fontSize: '110%',
                fontWeight: 'bold'
              }}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );

}

export default ProjectForm;