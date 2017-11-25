import React, { Component } from 'react';
import { getRestaurantPhoto } from './Services/foursquareApi.js';
require('dotenv').config();
class Restaurant extends Component {
  constructor (){
    super();
    this.state = {
     restaurantPhoto: ''
    }
  }
  // componentDidMount(){
  //   const restaurantId = this.props.restaurant.id
  //   getRestaurantPhoto(restaurantId).then((response) => {
  //     const photo = response.response.photos.items[0]
  //     if (photo) {
  //       const photoURL = photo.prefix +'64'+ photo.suffix
  //       this.setState({
  //         restaurantPhoto: photoURL
  //       })
  //     } else {
  //       const randomPhotoURL = `https://cdn.images.express.co.uk/img/dynamic/galleries/64x64/311989.jpg`
  //       this.setState({
  //         restaurantPhoto: randomPhotoURL
  //       })
  //     }
  //   })
  // }

  getRestaurantList (getParams) {
    let endPoint = "/req/auth";
    let params = getParams; //is it necessary to include the JSON.stringify() ?
    let endPoint = "/req/membAdd";
    return fetch(endPoint, {
      method: 'GET',
      headers: {
        "Accept":"application/json",
        "Content-Type":"application/json"
      }
    })
    .then((res) => res.json())


  addRest: (rest) => {
      return knex('restaurants')
        .insert({
          restid:     rest.id,
          url:        rest.url,
          imageUrl:   rest.image,
          rating:     rest.rating,
          phone:      rest.phone,
          coordLong:  rest.clong,
          coordLat:   rest.clat,
          city:       rest.city,
          country:    rest.country,
          addr2:      rest.addr2,
          addr3:      rest.addr3,
          state:      rest.state,
          addr1:      rest.addr1,
          zipCode:    rest.zcode
        })
    }, //fin addRestauran



  render() {
    const restaurant = this.props.restaurant

    return (
      <li>
        <hr></hr>
        <div className="restaurant-info">
          <div><img src={this.state.restaurantPhoto}/></div>
          <div><h5><span className="restaurant-name">{restaurant.name}</span></h5></div>
          <div><span className="address">{restaurant.location.formattedAddress[0]}</span></div>
          <div><span className="city">{restaurant.location.formattedAddress[1]}</span></div>
          <div><span className="country">{restaurant.location.formattedAddress[2]}</span></div>
          <div><span className="phone">{restaurant.contact.formattedPhone}</span></div>
          <div><span className="site">{restaurant.url}</span></div>
        </div>
        <div className="review">
        </div>
      </li>
    );
  }
}

export default Restaurant;
