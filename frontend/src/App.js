import { React} from 'react';
import { Route } from 'react-router-dom';
import Login from './component/Login'
import Signup from './component/Signup'
import Control from './component/Control'
import Home from './component/Home'


function App() {
  // var [mode, setMode] = useState('LOGIN');

  // var formTag = '';
  // if(mode === 'LOGIN') {
  //   formTag = <Login />
  // } else if(mode === 'SIGNUP') {
  //   formTag = <Signup />
  // }

  return (
    <div className="App">
      {/* <Control onChangeMode={function(mode) {
        setMode(mode)
      }}/> */}
      <Control />
      <Route path="/" component={Home} exact={true} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </div>
  );
}

export default App;
