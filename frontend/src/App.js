import { React } from 'react';
import { Route } from 'react-router-dom';
import Login from './component/Login'
import Signup from './component/Signup'
import Nav from './component/Nav'
import Home from './component/Home'


function App(props) {

  return (
    <div className="App">
      <Nav />
      <Route path="/" component={Home} exact={true} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </div>
  );
}

export default App;
