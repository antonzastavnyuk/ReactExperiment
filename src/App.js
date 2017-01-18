import React from 'react';

var Hotel = function(props) {
  var item = props.data;
  var index = props.index;
  return (
    <li key={index}>
      <span>{item.title.rendered} </span>
      <a href={item.acf.location_phone.split(' ').join('')}>{item.acf.location_phone} </a>
      <span>{item.acf.location_price} </span>
      <span>{item.acf.location_distance} </span>
    </li>
  )
};

var HotelsList = function(props){
  return (
    <ul className='hotels__list js-hotels-list'>
      {props.hotels.map(function(item, index){
        if (item['location-type'][0] == 2){
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

const HotelsListClass = React.createClass({
  getInitialState() {
    return {
      hotels: [],
      sorted: false,
      filtredByName: [],
      intialText: '',
      enteredText: false
    };
  },

  loadLocations: function(){
    var _this = this;
    var request = new XMLHttpRequest();
    request.open('GET', 'http://www.inforum.nyc/wp-json/wp/v2/locations?per_page=100', true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        _this.setState({hotels: JSON.parse(request.responseText)});
      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
    };
    request.send();
  },

  reverseText: function(event) {
    this.setState({
      intialText: event.target.value.split('').reverse().join('')
    });
  },

  sortByName: function() {
    this.setState(function(prevState) {
      return {
        hotels: this.state.sorted ? prevState.hotels.sort(sortByNameDesc) : prevState.hotels.sort(sortByNameAsc),
        sorted: !this.state.sorted
      };
    });
  },

  sortByPrice: function() {
    this.setState(function (prevState) {
      return {
        hotels: prevState.hotels.sort(sortByPrice)
      }
    });
  },

  sortByDistance: function() {
    this.setState(function (prevState) {
      return {
        hotels: prevState.hotels.sort(sortByDistance)
      }
    });
  },

  filterByName: function(event){

    var target = event.target.value;
    this.setState(function(){
      return {
        filtredByName: this.state.hotels.filter(function(item){
          if (item.title.rendered.indexOf(target) >= 0){
            return true;
          }
        }),
        enteredText: true
      }
    });
  },

  componentDidMount: function(props) {
    this.loadLocations();
  },

  componentWillMount: function(props) {
    // empty
  },

  render: function() {
    return (
      <div className='hotels'>
        <HotelsList hotels={this.state.enteredText ? this.state.filtredByName : this.state.hotels}/>
        <button onClick={this.sortByName}>Sort by name</button>
        <button onClick={this.sortByPrice}>Sort by price</button>
        <button onClick={this.sortByDistance}>Sort by distance</button>
        <h1>{this.state.intialText}</h1>
        <input type='text' defaultValue={this.state.intialText} onChange={this.filterByName}/>
      </div>
    )
  }
});

function sortByNameAsc(a, b) {
  var nameA = a.title.rendered.toUpperCase(); // ignore upper and lowercase
  var nameB = b.title.rendered.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
};

function sortByNameDesc(a, b) {
  var nameA = a.title.rendered.toUpperCase(); // ignore upper and lowercase
  var nameB = b.title.rendered.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return 1;
  }
  if (nameA > nameB) {
    return -1;
  }
  return 0;
};

function sortByPrice (a, b) {
  var aReplace = a.acf.location_price.replace('$', '');
  var bReplace = b.acf.location_price.replace('$', '');
  if (aReplace > bReplace) {
    return 1;
  }
  if (aReplace < bReplace) {
    return -1;
  }
  return 0;
};

function sortByDistance (a, b) {
  var resultA = a.acf.location_distance.match( '^[0-9.]+' );
  var resultB = b.acf.location_distance.match( '^[0-9.]+' );
  if (resultA > resultB) {
    return 1;
  }
  if (resultA < resultB) {
    return -1;
  }
  return 0;
}

export default HotelsListClass;
