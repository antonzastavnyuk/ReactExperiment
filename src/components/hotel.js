import React from 'react';

var Hotel = function (props) {  
  return (
    <li key={props.index}>
      <span>{props.data.title.rendered} </span>
      <a href={props.data.acf.location_phone.split(' ').join('')}>{props.data.acf.location_phone} </a>
      <span>{props.data.acf.location_price} </span>
      <span>{props.data.acf.location_distance} </span>
    </li>
  )
}

module.exports = Hotel;
