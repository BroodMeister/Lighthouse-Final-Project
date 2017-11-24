import React from 'react'
import { Link } from 'react-router-dom'

class RestaurantLogin extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      member: "",
      password: ""
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const loginParams = { member: this.state.member, password: this.state.password}
    this.props.onLogin(loginParams)
    this.setState({
      member: "",
      password:""
    })
  }




  Modmember = (event) => {
    this.setState({
      member: event.target.value
    })
  }


  Modpassword = (event) => {
    this.setState({
      password: event.target.value
    })
  }


  render() {

      return (
        <div className="container">
        <h1>Login Here</h1>
        <form onSubmit={this.handleSubmit} className="field is-grouped is-grouped-centered">
          <div className="control">
          <input className="input is-primary" type="text" placeholder="Member name" onChange={this.Modmember} value={this.state.member}/>
          </div>
          <div className="control">
          <input  className="input is-primary" type="password" placeholder="password" onChange={this.Modpassword} value={this.state.password}/>
          </div>
          <div className="control">
          <input className="button is-primary is-inverted is-outlined" type="submit" value="Submit"/>
          </div>
        </form>
        <br/>
          <Link to='/signup'><h4><a id="add-new-spot">Or Sign Up Here</a></h4></Link>
        </div>
      )
    }

}

export default RestaurantLogin