import { React, useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import NetworkInner from './NetworkInner';
import url from '../../../url/http';
import axios from 'axios';
import imgfile from '../../../image/catNotFind.png'

function Network(props) {

  let [userData, setUserData] = useState([]);
  let [searchValue, setSearchValue] = useState('');
  let innerTag = [];

  useEffect(()=>{
    if (userData.length === 0) {
      axios.get(url + 'account')
      .then((res)=>{
        setUserData(res.data.result);
      }).catch((err)=>{
        console.log(err);
      });
    }
  }, [props, userData.length]);

  if (userData === 'nothing') {
    innerTag = 
    <div style={{width: '100%'}}>
      <div className="d-flex flex-column align-items-center">
        <img src={imgfile} alt="catNotFind" />
        <p style={{
                fontFamily: 'Noto Sans KR, sans-serif',
                fontSize: '150%',
                fontWeight: 'bold'
              }}
        >
          결과가 없습니다. ㅠㅠ
        </p>
      </div>
    </div>
  } else {
    for (const user of userData) {
      if (user[0] !== props.currentUser) {
        innerTag.push(<NetworkInner
          key={user[2]}
          userId = {user[0]}
          name={user[1]}
          email={user[2]} 
          introduction={user[4]} 
          image={user[5]} 
          />)
      }
    }
    if (innerTag.length % 3 === 1) {
      innerTag.push(<Col key={userData.length} col="4"></Col>)
      innerTag.push(<Col key={userData.length + 1} col="4"></Col>)
    } else if (innerTag.length % 3 === 2) {
      innerTag.push(<Col key={userData.length} col="4"></Col>)
    }
  }
  return (
    <div>
      <Container className="my-5">
        <Form className="d-flex justify-content-center my-5" style={{ width: '100%' }}
          onSubmit={(e)=>{
            e.preventDefault();
            let target;
            target = e.target.searchItem.value;
            axios.get(url + 'account', {
              params: {
                target: target
              }
            }).then((res)=>{
              const data = res.data.result;
              if (data==='lack') {
                alert('2글자 이상 입력해주세요');
              } else if (data==='nothing') {
                setUserData('nothing');
              } else {
                setUserData(res.data.result);
              }
            }).catch((err)=>{
              console.log(err);
            })
          }}
        >
          <Form.Control name="searchItem" value={searchValue} 
            onChange={(e)=>{
              setSearchValue(e.target.value);
            }} 
            style={{ 
              width: '50%', 
              fontFamily: 'Noto Sans KR, sans-serif', 
              fontSize: '110%', 
              fontWeight: 'bold'
            }} 
            type="text" 
            placeholder="Search" 
            className="" 
          />
          <Button className="ml-1" type="submit" variant="outline-success"
            style={{  
              fontFamily: 'Noto Sans KR, sans-serif', 
              fontSize: '110%', 
              fontWeight: 'bold'
            }}
          >
            Search
          </Button>
          <Button className="ml-1" variant="outline-primary" 
            onClick={()=>{
              setSearchValue('');
              axios.get(url + 'account')
              .then((res)=>{
                setUserData(res.data.result);
              }).catch((err)=>{
                console.log(err);
              });
            }}
          style={{  
            fontFamily: 'Noto Sans KR, sans-serif', 
            fontSize: '110%', 
            fontWeight: 'bold'
          }}
          >
            Reset
          </Button>
        </Form>
        <Row>
          {innerTag}
        </Row>
      </Container>
    </div>
  );
}

export default Network;