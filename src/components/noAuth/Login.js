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
    })
  }

  _setPassword(e) {
    this.setState({
      password: e.target.value,
    })
  }

  _login(e) {
    e.preventDefault();

    if (this.state.user === '') {
      const error = "Email missing."
      return this.setState({
        userError: error
      })
    } else {
      this.setState({
        userError: ''
      })
    }

    if (this.state.user.length > 100) {
      const error = "Email too long."
      return this.setState({
        userError: error
      })
    } else {
      this.setState({
        userError: ''
      })
    }

    if (this.state.password === '') {
      const error = "Password missing."
      return this.setState({
        passwordError: error
      })
    } else {
      this.setState({
        passwordError: ''
      })
    }

    if (this.state.password.length  > 50) {
      const error = "Password too long."
      return this.setState({
        passwordError: error
      })
    } else {
      this.setState({
        passwordError: ''
      })
    }

    login(this.state.user, this.state.password);
  }

  _createAccountClick(e) {
    e.preventDefault()
    browserHistory.push('/account/create');
  }
  
  _forgotPasswordClick(e) {
    e.preventDefault()
    browserHistory.push('/account/password/reset');
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
                       errorText={this.state.userError}
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
                       errorText={this.state.passwordError}
                       onKeyPress={this._handleKeyPress.bind(this)}
                       placeholder="Password"/>
          </div>
          <div className="db mt2 pc f6">
            <div className="dib dim pointer"
                 onClick={this._forgotPasswordClick.bind(this)}>
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