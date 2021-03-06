import { React} from 'react';
import Portfolio from './Portfolio'

function MyPage(props) {

  return (
    <div className=""  >
      <Portfolio targetId={Number(props.targetId)} accessToken={props.accessToken} currentUser={props.currentUser} />
    </div>
  );
}

export default MyPage;