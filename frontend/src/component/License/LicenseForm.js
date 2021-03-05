import { React, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import url from '../../url/http';

function LicenseForm(props) {

  const [startDate, setStartDate] = useState(new Date(props.acquisitionDate));

  return(
    <Form onSubmit={function(e) {
      e.preventDefault();
      if(props.formMode === '제출') {

        axios.post(url + 'license/post',{
          name: e.target.name.value,
          issuer: e.target.issuer.value,
          acquisitionDate: startDate,
        }, props.header)
        .then((res)=>{
          props.changeLicenseData(res.data.res);
        }).catch((err)=>{
          console.log(err);
        });
      } else {

        axios.put(url + `license/post/${props.postId}`,{
          name: e.target.name.value,
          issuer: e.target.issuer.value,
          acquisitionDate: startDate,
        }, props.header)
        .then((res)=>{
          props.changeLicenseData(res.data.res);
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
        <Form.Label>발급기관</Form.Label>
        <Form.Control type="text" name="issuer" defaultValue={props.issuer} />
      </Form.Group>
      <div className="d-flex">
        <DatePicker
          dateFormat="yyyy-MM-dd"
          selected={startDate}
          onChange={date => setStartDate(date)}
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

export default LicenseForm;