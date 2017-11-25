import React from 'react'

class RestaurantSignup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      member:    "",
      nameFirst: "",
      nameLast:  "",
      email:     "",
      password:  ""
    }
  }

  ModSubmit = (event) => {
    event.preventDefault()

    const signupParams = { member: this.state.member, password: this.state.password}
    this.props.onSignup(signupParams)
    this.setState({
      member:    "",
      nameFirst: "",
      nameLast:  "",
      email:     "",
      password:  ""
    })
  }

  Modmember = (event) => {
    this.setState({
      member: event.target.value
    })
  }

  ModnameFirst = (event) => {
    this.setState({
      nameFirst: event.target.value
    })
  }

  ModnameLast = (event) => {
    this.setState({
      nameLast: event.target.value
    })
  }

  Modemail = (event) => {
    this.setState({
      email: event.target.value
    })
  }

  Modpassword = (event) => {
    this.setState({
      password: event.target.value
    })
  }


  render() {
      return (
        <div className="dropdown-menu">
          <div className="px-4 py-3">
            <div className="col-lg-12">
              <form id="ajax-register-form" onSubmit={this.ModSubmit} >
                <div className="form-group">
                  <input className ="form-control"type="text" placeholder="Username" onChange={this.Modmember} value={this.state.member}/>
                </div>
                <div className="form-group">
                  <input className="form-control" type="text" placeholder="First name" onChange={this.ModnameFirst} value={this.state.nameFirst}/>
                </div>
                <div className="form-group">
                  <input className="form-control" type="text" placeholder="Last name" onChange={this.ModnameLast} value={this.state.nameLast}/>
                </div>
                <div className="form-group">
                  <input className="form-control" type="email" placeholder="email" onChange={this.Modemail} value={this.state.email}/>
                </div>
                <div className="form-group">
                  <input  className="form-control" type="password" placeholder="Password" onChange={this.Modpassword} value={this.state.password}/>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-xs-6 col-xs-offset-3">
                      <input type="submit" name="register-submit" id="register-submit" tabindex="4" className="form-control btn btn-info" value="Register Now"/>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div >
      
      )
  }

}

export default RestaurantSignup


