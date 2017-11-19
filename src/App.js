import React, { Component } from 'react';
import './App.css';
import Map from './Map.js';

class App extends Component {
  render() {

    const markers = [
      {
        location:{
          lat: 49.2827, lng: -123.1207
        }
      },
      {
        location:{
          lat: 49.1999338615338, lng: -123.1207
        }
      }
    ]
     
    return (
      <div className="App">
        <div className="map-column">
          <Map 
            markers={markers}
            center={{ lat: 49.2827, lng: -123.1207 }}
            zoom={14}
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      </div>
    );
  }
}

export default App;
