// var React = require('react')
// var ReactDOM = require('react-dom');
// var Hotel = require('./Hotel.js');

// import React from 'react';
// import Hotel from './Hotel.js';

var Hotel = function(props) {
  return (
    <li>
      <span>{props.hotelName} </span>
      <a href={props.hotelPhone.split(' ').join('')}>{props.hotelPhone} </a>
      <span>{props.hotelPrice} </span>
      <span>{props.hotelDistance} </span>
    </li>
  )
};

const HotelsListClass = React.createClass({
  getInitialState() {
    return {
      hotels: [
        // {
        //   name: 'Sheraton Times Square',
        //   address: '811 7th Ave W 53rd Street New York, NY 10019',
        //   phone: '(212) 581-1000',
        //   price: '$259',
        //   distance: '1.9 miles to Javits'
        // },
        // {
        //   name: 'DoubleTree by Hilton NYC Chelsea',
        //   address: '128 W 29th Street New York, NY 10001',
        //   phone: '(212) 564-0994',
        //   price: '$229',
        //   distance: '1.2 miles to Javits'
        //   },
        // {
        //   name: 'Candlewood Suites Times Square',
        //   address: '339 W 39th Street New York, NY 10018',
        //   phone: '(212) 967-2254',
        //   price: '$249',
        //   distance: '0.7 miles to Javits'
        // }
      ],
      sorted: false,
      intialText: ''
    };
  },

  loadLocations: function(){
    var _this = this;
    // console.log(_this);
    var request = new XMLHttpRequest();
    request.open('GET', 'http://www.inforum.nyc/wp-json/wp/v2/locations?per_page=100', true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(request.responseText);

        var hotels = data.map(function(item) {
            // if(item['location-type'] == 2) {
              return {
                name: item.title.rendered,
                address: item.acf.location_address.replace(/<\/?[^>]+(>|$)/g, ""),
                phone: item.acf.location_phone,
                price: item.acf.location_price,
                distance: item.acf.location_distance
              }
            // }
        });

        _this.setState({hotels: hotels});
      } else {
        // We reached our target server, but it returned an error
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

  componentDidMount: function(props) {
    this.loadLocations();
  },

  componentWillMount: function(props) {

  },

  render: function() {
    return (
      <div className='hotels'>
        <ul className='hotels__list js-hotels-list'>
          {this.state.hotels.map(function(item, index) {
            return <Hotel key={index}
                          hotelName={item.name}
                          hotelPhone={item.phone}
                          hotelPrice={item.price}
                          hotelDistance={item.distance} />
          })}
        </ul>
        <button onClick={this.sortByName}>Sort by name</button>
        <button onClick={this.sortByPrice}>Sort by price</button>
        <button onClick={this.sortByDistance}>Sort by distance</button>
        <h1>{this.state.intialText}</h1>
        <input type='text' defaultValue={this.state.intialText} onChange={this.reverseText}/>
      </div>
    )
  }
});

ReactDOM.render(
  <HotelsListClass />,
  document.getElementById('root')
);


function sortByNameAsc(a, b) {
  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
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
  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return 1;
  }
  if (nameA > nameB) {
    return -1;
  }

  // names must be equal
  return 0;
};

function sortByPrice (a, b) {
  var aReplace = a.price.replace('$', '');
  var bReplace = b.price.replace('$', '');
  return aReplace - bReplace;
};

function sortByDistance (a, b) {
  var resultA = a.distance.match( '^[0-9.]+' );
  var resultB = b.distance.match( '^[0-9.]+' );
  return resultA[0] - resultB[0]
}

// function parseLocations(data) {
//   var hotels = data.map(function(item) {
//     return {
//       name: item.title.rendered,
//       address: item.acf.location_address.replace(/<\/?[^>]+(>|$)/g, ""),
//       phone: item.acf.location_phone,
//       price: item.acf.location_price,
//       distance: item.acf.location_distance
//     }
//   });
//
//   console.log(hotels);
// }
