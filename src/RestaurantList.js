import React, {Component} from 'react';
import Restaurant from './Restaurant.js';


class RestaurantList extends Component {

  render() {
  	const list = this.props.venues.map((venue, i) => {
			return (
				<Restaurant key={i} onLoggedIn={this.props.onLoggedIn} restaurant={venue} showFavourites={this.props.showFavourites} onDelFavourite={this.props.onDelFavourite} onAddFavourite={this.props.onAddFavourite}/>
			)
		})
    // we need to change the title depends on the state of the list
  return (
    <div>
      <h2>Top Vegetarian Restaurants in Town</h2>
      <hr></hr>
      <ol className="restaurant-list">
        {list}
      </ol>
     </div>
    );
  }
}

export default RestaurantList;
