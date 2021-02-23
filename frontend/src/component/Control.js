import React from 'react';

function Control(props) {
  return (
    <ul>
      <li>
        <input
          type="button"
          value="login"
          onClick={function() {
            props.onChangeMode("LOGIN");
          }}
        />
      </li>
      <li>
        <input
          type="button"
          value="signUp"
          onClick={function() {
            props.onChangeMode("SIGNUP");
          }}
        />
      </li>
    </ul>
  );
}

export default Control;