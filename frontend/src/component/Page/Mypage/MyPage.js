import { React} from 'react';
import Portfolio from './Portfolio'

function MyPage(props) {

  return (
    <div className="" style={{height: "100%"}} >
      <Portfolio targetId={Number(props.targetId)} accessToken={props.accessToken} currentUser={props.currentUser} />
    </div>
  );
}

export default MyPage;