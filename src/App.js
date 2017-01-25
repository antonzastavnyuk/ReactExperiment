import React from 'react';
import HotelsList from './components/hotelsList';
import {filterHotels, sortByNameAsc, sortByNameDesc, sortByPriceAsc, sortByPriceDesc, sortByDistanceAsc, sortByDistanceDesc, } from './components/functions';
require('es6-promise').polyfill();
require('isomorphic-fetch');

const HotelsListClass = React.createClass({
  getInitialState() {
    return {
      hotels: [],
      sortedByName: false,
      sortedByPrice: false,
      sortedByDistance: false,
      filtredByName: [],
      enteredText: false
    };
  },

  loadLocations: function(){
    var _this = this;
    fetch('http://www.inforum.nyc/wp-json/wp/v2/locations?per_page=100')
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(function(hotels) {
      _this.setState({hotels: hotels});
    });
  },

  sortByName: function() {
    this.setState(function(prevState) {
      return {
        hotels: this.state.sortedByName ? prevState.hotels.sort(sortByNameDesc) : prevState.hotels.sort(sortByNameAsc),
        sortedByName: !this.state.sortedByName
      };
    });
  },

  sortByPrice: function() {
    this.setState(function (prevState) {
      return {
        hotels: this.state.sortedByPrice ? prevState.hotels.sort(sortByPriceDesc) : prevState.hotels.sort(sortByPriceAsc),
        sortedByPrice: !this.state.sortedByPrice
      }
    });
  },

  sortByDistance: function() {
    this.setState(function (prevState) {
      return {
        hotels: this.state.sortedByDistance ? prevState.hotels.sort(sortByDistanceDesc) : prevState.hotels.sort(sortByDistanceAsc),
        sortedByDistance: !this.state.sortedByDistance
      }
    });
  },

  filterByName: function(event){
    var target = event.target.value.toLowerCase();
    if (target.length > 0) {
      this.setState({
        filtredByName: filterHotels (this.state, target),
        enteredText: true
      })
    } else {
      this.setState({
        enteredText: false
      });
    }
  },

  componentDidMount: function(props) {
    this.loadLocations();
  },

  render: function() {
    return (
      <div className='hotels'>
        <HotelsList hotels={this.state.enteredText ? this.state.filtredByName : this.state.hotels}/>
        <button onClick={this.sortByName}>Sort by name</button>
        <button onClick={this.sortByPrice}>Sort by price</button>
        <button onClick={this.sortByDistance}>Sort by distance</button>
        <input type='text' onChange={this.filterByName}/>
      </div>
    )
  }
});

export default HotelsListClass;
