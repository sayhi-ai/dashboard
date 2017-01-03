import React from 'react';
import TextField from "material-ui/TextField"
import RaisedButton from "material-ui/RaisedButton"
import browserHistory from '../../history'
import * as errorActions from "../../actions/errorAction"
import {createAccount} from '../../services/accountService'

export default class Login extends React.Component {

  constructor(props) {
    super(props)
    this.checked = false;
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password1: '',
      password2: '',
    };
  }

  _setFirstName(e) {
    this.setState({
      firstName: e.target.value,
    })
  }

  _setLastName(e) {
    this.setState({
      lastName: e.target.value,
    })
  }

  _setEmail(e) {
    this.setState({
      email: e.target.value,
    })
  }

  _setPassword1(e) {
    this.setState({
      password1: e.target.value,
    })
  }

  _setPassword2(e) {
    this.setState({
      password2: e.target.value,
    })
  }

  _loginClick(e) {
    e.preventDefault()
    browserHistory.push('/login');
  }

  _validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  _createAccount(e) {
    e.preventDefault();


    if (this.state.firstName === '') {
      const error = "First name missing."
      this.setState({
        firstNameError: error
      })
      return;
    } else {
      this.setState({
        firstNameError: ''
      })
    }

    if (this.state.firstName.length > 30) {
      const error = "First name is too long."
      this.setState({
        firstNameError: error
      })
      return;
    } else {
      this.setState({
        firstNameError: ''
      })
    }

    if (this.state.lastName === '') {
      const error = "Last name missing."
      this.setState({
        lastNameError: error
      })
      return;
    } else {
      this.setState({
        lastNameError: ''
      })
    }

    if (this.state.lastName.length > 30) {
      const error = "Last name is too long."
      this.setState({
        lastNameError: error
      })
      return;
    } else {
      this.setState({
        lastNameError: ''
      })
    }

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

    if (!this.checked) {
      errorActions.handleNoAuthError("You must agree to the terms and conditions to create an account.");
    } else {
      createAccount(this.state.firstName, this.state.lastName, this.state.email, this.state.password1);
    }
  }

  _handleKeyPress(event) {
    if (event.key == 'Enter') {
      this._createAccount(event)
    }
  }

  _handleCheckBoxClick(e) {
    e.preventDefault();
    this.checked = !this.checked;
  }

  render() {
    return (
      <div className="login-form-div">
        <form className="login-form">
          <div className="db">
            <div className="dib w4 mr1">
              <TextField type="text"
                         underlineStyle={{color: "#19A5E4"}}
                         value={this.state.user}
                         onChange={this._setFirstName.bind(this)}
                         style={{width: "auto"}}
                         id="firstName"
                         errorText={this.state.firstNameError}
                         onKeyPress={this._handleKeyPress.bind(this)}
                         placeholder="First Name"/>
            </div>
            <div className="dib w4 ml1">
              <TextField type="text"
                         underlineStyle={{color: "#19A5E4"}}
                         value={this.state.user}
                         onChange={this._setLastName.bind(this)}
                         style={{width: "auto"}}
                         id="lastName"
                         errorText={this.state.lastNameError}
                         onKeyPress={this._handleKeyPress.bind(this)}
                         placeholder="Last Name"/>
            </div>
          </div>
          <div className="">
            <TextField type="text"
                       underlineStyle={{color: "#19A5E4"}}
                       value={this.state.user}
                       onChange={this._setEmail.bind(this)}
                       className="form-control"
                       id="email"
                       errorText={this.state.emailError}
                       onKeyPress={this._handleKeyPress.bind(this)}
                       placeholder="Email"/>
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
                       placeholder="Password"/>
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
          <div className="db mt2 mb4">
            <div className="dib">

            </div>
            <div className="dib f6 v-top pt1">I agree to the
              <a className="pc dim pointer no-underline" href="https://sayhi.ai" target="_blank"> terms and conditions</a>.
            </div>
          </div>
          <div className="db mt3">
            <div className="login-button">
              <RaisedButton type="submit"
                            labelStyle={{color: "#19A5E4"}}
                            primary={false}
                            onClick={this._loginClick.bind(this)}
                            label="Login"/>
            </div>
            <div className="create-account-button">
              <RaisedButton type="submit"
                            labelStyle={{color: "#FFFFFF"}}
                            primary={true}
                            onClick={this._createAccount.bind(this)}
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