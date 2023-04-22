import React from 'react';
import './Circle.css';

const Circle = (props) => {
  return (
   
       <button className="circle" id="circle" onClick={props.clicks}></button> 
    
  );
};

export default Circle;
