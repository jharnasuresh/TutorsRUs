import React from 'react';

function ButtonList(props) {
  const { followers } = props;

  return (
    <div>
      {followers.map((text, index) => (
        <button key={index}>{text}</button>
      ))}
    </div>
  );
}

export default ButtonList;