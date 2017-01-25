import React from 'react';
import Hotel from './hotel';

var HotelsList = function(props){
  return (
    <ul className='hotels__list js-hotels-list'>
      {props.hotels.map(function(item, index){
        if (item['location-type'][0] === 2){
          return (
            <Hotel key={index} data={item}/>
          )
        } else {
          return null;
        }
      })}
    </ul>
  )
}

module.exports = HotelsList;
