import { React, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import url from '../../url/http';

function LicenseForm(props) {

  const [startDate, setStartDate] = useState(new Date(props.acquisitionDate));

  return(
    <Card>
      <Card.Body>
        <Form onSubmit={function(e) {
          e.preventDefault();
          if(props.formMode === 'Submit') {

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
            <Form.Label
              style={{
                fontFamily: 'Noto Sans KR, sans-serif',
                fontSize: '120%',
                fontWeight: 'bold'
              }}
            >
              수상내역
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
                fontSize: '120%',
                fontWeight: 'bold'
              }}
            >
              발급기관
            </Form.Label>
            <Form.Control type="text" name="issuer" 
              defaultValue={props.issuer} 
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
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </div>
          <div className="d-flex justify-content-end">
            <Button className="mr-2" variant="secondary" type="submit">
              {props.formMode}
            </Button>
            <Button variant="secondary" type="submit" onClick={()=>{
              props.changeMode('READ');
            }}>
              Cancel
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );

}

export default LicenseForm;