import React from 'react';
import './Circle.css';

const Circle = (props) => {
  const circleClass = props.id === props.current ? "circle active" : "circle";
  return (
    <button className={circleClass} id={`circle${props.id}`} onClick={props.clicks}></button> 
  );
};

export default Circle;
