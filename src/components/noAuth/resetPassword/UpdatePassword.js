import React from 'react';
import {login} from '../../../services/authService'
import TextField from "material-ui/TextField"
import RaisedButton from "material-ui/RaisedButton"
import * as errorActions from "../../../actions/errorAction"
import browserHistory from '../../../history'

export default class UpdatePassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      code: '',
      password1: '',
      password2: ''
    };
  }

  _setUsername(e) {
    this.setState({
      code: e.target.value,
    })
  }

  _setPassword1 = e => {
    this.setState({
      password1: e.target.value,
    })
  }

  _setPassword2 = e => {
    this.setState({
      password2: e.target.value,
    })
  }

  _updatePassword(e) {
    e.preventDefault();

    if (this.state.code === '') {
      const error = "Email missing."
      this.setState({
        codeError: error
      })
      return;
    } else {
      this.setState({
        codeError: ''
      })
    }

    if (this.state.code.length > 100) {
      const error = "Email is too long."
      this.setState({
        codeError: error
      })
      return;
    } else {
      this.setState({
        codeError: ''
      })
    }

    if (this.state.password1 === '' || this.state.password2 === '') {
      const error = "Password missing."
      this.setState({
        password1Error: error
      })
      return;
    } else {
      this.setState({
        password1Error: ''
      })
    }

    if (this.state.password1.length > 50 || this.state.password1.length < 6) {
      const error = "Password has to be between 6 and 50 characters."
      this.setState({
        password1Error: error
      })
      return;
    } else {
      this.setState({
        password1Error: ''
      })
    }

    if (this.state.password1 !== this.state.password2) {
      const error = "Passwords do not match."
      this.setState({
        password1Error: error,
        password2Error: error
      })
      return;
    } else {
      this.setState({
        password1Error: '',
        password2Error: ''
      })
    }

    console.log("update password")
  }

  _handleKeyPress(event) {
    if (event.key == 'Enter') {
      this._updatePassword(event)
    }
  }

  _loginClick(e) {
    e.preventDefault()
    browserHistory.push('/login');
  }

  render() {
    return (
      <div className="login-form-div">
        <p className="f5">Enter the code from the e-mail we sent you to reset your password.</p>
        <form className="login-form">
          <div className="">
            <TextField type="text"
                       underlineStyle={{color: "#19A5E4"}}
                       value={this.state.code}
                       onChange={this._setUsername.bind(this)}
                       className="form-control"
                       id="code"
                       onKeyPress={this._handleKeyPress.bind(this)}
                       placeholder="Code"/>
          </div>
          <div className="">
            <TextField type="password"
                       underlineStyle={{color: "#19A5E4"}}
                       value={this.state.password1}
                       onChange={this._setPassword1.bind(this)}
                       className="form-control"
                       id="password"
                       ref="password"
                       errorText={this.state.password1Error}
                       onKeyPress={this._handleKeyPress.bind(this)}
                       placeholder="New Password"/>
          </div>
          <div className="">
            <TextField type="password"
                       underlineStyle={{color: "#19A5E4"}}
                       value={this.state.password2}
                       onChange={this._setPassword2.bind(this)}
                       className="form-control"
                       id="password"
                       ref="password"
                       errorText={this.state.password2Error}
                       onKeyPress={this._handleKeyPress.bind(this)}
                       placeholder="Repeat Password"/>
          </div>
          <div className="db mt4">
            <div className="dib mr2">
              <RaisedButton type="submit"
                            labelStyle={{color: "#19A5E4"}}
                            primary={false}
                            onClick={this._loginClick.bind(this)}
                            label="Login"/>
            </div>
            <div className="dib ml2">
              <RaisedButton type="submit"
                            labelStyle={{color: "#FFFFFF"}}
                            primary={true}
                            onClick={this._updatePassword.bind(this)}
                            label="Update Password"/>
            </div>
            <div style={{position: "absolute", left: "-5000px"}} aria-hidden="true">
              <input type="text"
                     name="b_91105fa973023812cf53dce73_5ddf44500c"
                     tabIndex="-1"
                     id="validate"
                     ref="validated"/>
            </div>
          </div>
          <p className="pt2 f6">
            If you did not receive the e-mail, click <span className="dim pointer pc">here</span> to send it again.
          </p>
        </form>
      </div>
    );
  }
}