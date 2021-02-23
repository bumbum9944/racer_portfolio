import { React, useState } from 'react';
import Login from './component/Login'
import Signup from './component/Signup'
import Control from './component/Control'

function App() {
  var [mode, setMode] = useState('LOGIN');

  var formTag = '';
  if(mode === 'LOGIN') {
    formTag = <Login />
  } else if(mode === 'SIGNUP') {
    formTag = <Signup />
  }

  return (
    <div className="App">
      <Control onChangeMode={function(mode) {
        setMode(mode)
      }}/>
      {formTag}
    </div>
  );
}

export default App;
