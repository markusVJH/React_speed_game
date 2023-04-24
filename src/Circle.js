import React from 'react';
import './Circle.css';

const Circle = (props) => {
  const { id, color, active, clicks } = props;

  return (
    <button
      className={`circle ${active ? 'active' : ''}`}
      style={{ backgroundColor: active ? 'white' : color }}
      id={`circle-${id}`}
      onClick={clicks}
    ></button>
  );
};

export default Circle;
