import React from 'react';
import './Circle.css';

const Circle = (props) => {
  const { id, color, active, clicks } = props;

  const brightness = active ? 'saturate(520%)' : 'brightness(50%)';
  const circleStyle = {
    backgroundColor: color,
    filter: brightness
  };

  return (
    <button
      className={`circle ${active ? 'active' : ''}`}
      style={circleStyle}
      id={`circle-${id}`}
      onClick={clicks}
      disabled={!props.gameRunning}
    ></button>
  );
};

export default Circle;
