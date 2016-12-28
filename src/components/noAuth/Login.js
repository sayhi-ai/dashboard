import React from 'react';
import {login} from '../../services/authService'
import TextField from "material-ui/TextField"
import RaisedButton from "material-ui/RaisedButton"
import * as errorActions from "../../actions/errorAction"
import browserHistory from '../../history'

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: ''
    };
  }

  _setUsername(e) {
    this.setState({
      user: e.target.value,
      open: false
    })
  }

  _setPassword(e) {
    this.setState({
      password: e.target.value,
      open: false
    })
  }

  _login(e) {
    e.preventDefault();

    let error = null
    if (this.state.user === '') {
      error = "Email missing."
    }

    if (this.state.user.length > 100) {
      error = "Email is too long."
    }

    if (this.state.password === '') {
      error = "Password missing."
    }

    if (this.state.password.length > 100) {
      error = "Password is too long."
    }

    if (error === null) {
      login(this.state.user, this.state.password)
    } else {
      errorActions.handleNoAuthError(error);
    }
  }

  _createAccountClick(e) {
    e.preventDefault()
    browserHistory.push('/account/create');
  }

  _handleSnackBarClose() {
    this.setState({
      open: false
    })
  }

  _handleKeyPress(event) {
    if (event.key == 'Enter') {
      this._login(event)
    }
  }

  render() {
    return (
      <div className="login-form-div">
        <form className="login-form">
          <div className="">
            <TextField type="text"
                       underlineStyle={{color: "#19A5E4"}}
                       value={this.state.user}
                       onChange={this._setUsername.bind(this)}
                       className="form-control"
                       id="username"
                       onKeyPress={this._handleKeyPress.bind(this)}
                       placeholder="Email"/>
          </div>
          <div className="">
            <TextField type="password"
                       underlineStyle={{color: "#19A5E4"}}
                       value={this.state.password}
                       onChange={this._setPassword.bind(this)}
                       className="form-control"
                       id="password"
                       ref="password"
                       onKeyPress={this._handleKeyPress.bind(this)}
                       placeholder="Password"/>
          </div>
          <div className="forgot-password-div"
               onClick={() => console.log("sdf")}>
            <div className="forgot-password-text dim pointer">
              Forgot password?
            </div>
          </div>
          <div className="button-div">
            <div className="login-button">
              <RaisedButton type="submit"
                            labelStyle={{color: "#FFFFFF"}}
                            primary={true}
                            onClick={this._login.bind(this)}
                            label="Login"/>
            </div>
            <div className="create-account-button">
              <RaisedButton type="submit"
                            labelStyle={{color: "#19A5E4"}}
                            primary={false}
                            onClick={this._createAccountClick.bind(this)}
                            label="Create Account"/>
            </div>
          </div>
          <div style={{position: "absolute", left: "-5000px"}} aria-hidden="true">
            <input type="text" name="b_91105fa973023812cf53dce73_5ddf44500c" tabIndex="-1"
                   id="validate" ref="validated"/>
          </div>
        </form>
      </div>
    );
  }
}