import React, { Component } from 'react';
import './App.css';
import RestaurantContainer from './RestaurantContainer.js'
import {BrowserRouter as Router } from 'react-router-dom'
import NavBar from './NavBar.js'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      status: false
    }
  }
  onMemberStatus(name){
    this.setState({
      status: name ? true : false
    })
  }

  render() {
    return (
      <Router>
      <div className="App">
        <NavBar onMemberLogin={this.onMemberStatus.bind(this)}/>
        <RestaurantContainer onLoggedIn={this.state.status}/>
      </div>
      </Router>
    );
  }
}

export default App;
