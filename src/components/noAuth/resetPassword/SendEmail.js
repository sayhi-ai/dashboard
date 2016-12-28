import React from 'react';
import TextField from "material-ui/TextField"
import RaisedButton from "material-ui/RaisedButton"
import * as accountAction from "../../../actions/accountActions"

export default class SendEmail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }

  _setEmail(e) {
    this.setState({
      email: e.target.value,
    })
  }

  _sendEmail(e) {
    e.preventDefault();

    if (this.state.email === '') {
      const error = "Email missing."
      this.setState({
        emailError: error
      })
      return;
    } else {
      this.setState({
        emailError: ''
      })
    }

    if (this.state.email.length > 100) {
      const error = "Email is too long."
      this.setState({
        emailError: error
      })
      return;
    } else {
      this.setState({
        emailError: ''
      })
    }

    if (!this._validateEmail(this.state.email)) {
      const error = "Email is not valid."
      this.setState({
        emailError: error
      })
      return;
    } else {
      this.setState({
        emailError: ''
      })
    }

    accountAction.setEmailForReset(this.state.email);
  }

  _validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  _handleKeyPress(event) {
    if (event.key == 'Enter') {
      this._sendEmail(event)
    }
  }

  render() {
    return (
      <div className="login-form-div">
        <p className="f5">
          Enter your email below to get a recovery code.
        </p>
        <form className="login-form">
          <div className="">
            <TextField type="text"
                       underlineStyle={{color: "#19A5E4"}}
                       value={this.state.email}
                       onChange={this._setEmail.bind(this)}
                       className="form-control"
                       id="email"
                       errorText={this.state.emailError}
                       onKeyPress={this._handleKeyPress.bind(this)}
                       placeholder="Email"/>
          </div>
          <div className="button-div">
            <div className="dib">
              <RaisedButton type="submit"
                            labelStyle={{color: "white"}}
                            primary={true}
                            onClick={this._sendEmail.bind(this)}
                            label="Get Code"/>
            </div>
          </div>
          <div style={{position: "absolute", left: "-5000px"}} aria-hidden="true">
            <input type="text" name="b_91105fa973023812cf53dce73_5ddf44500c" tabIndex="-1"
                   id="validate" ref="validated"/>
          </div>
        </form>
      </div>
    )
  }
}