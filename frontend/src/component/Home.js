import { React} from 'react';
import Portfolio from './Portfolio'

function Home(props) {

  return (
    <div className="">
      <h1>home</h1>
      <Portfolio accessToken={props.accessToken} />
    </div>
  );
}

export default Home;