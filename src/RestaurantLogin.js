import React from 'react'

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

  onUsername = (event) => {
    this.setState({
      member: event.target.value
    })
  }

  onPassword = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  render() {

    return (
      <div className="px-4 py-3">
        <div className="col-lg-12">
        <div className="signup-title"><h3>Login Here</h3></div>
        <form onSubmit={this.handleSubmit} className="px-4 py-3">
          <div className="form-group">
            <input className="form-control" type="text" placeholder="Username" onChange={this.onUsername} value={this.state.member}/>
          </div>
          <div className="form-group">
            <input  className="form-control" type="password" placeholder="Password" onChange={this.onPassword} value={this.state.password}/>
          </div>
          <div className="form-group">
              <div className="row">
                <div className="col-xs-6 col-xs-offset-3">
                  <input type="submit" name="login-submit" id="login-submit" className="form-control btn btn-info" value="Login"/>
                </div>
              </div>
            </div>
        </form>
      </div>
      </div>
    )
  }
}

export default RestaurantLogin
