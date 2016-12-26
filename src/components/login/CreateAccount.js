import React from 'react';
import TextField from "material-ui/TextField"
import RaisedButton from "material-ui/RaisedButton"
import Paper from "material-ui/Paper"
import AccountStore from "../../stores/accountStore"
import logoTitleImage from "../../resources/img/logowithtext.png"
import Snackbar from "material-ui/Snackbar"
import browserHistory from '../../history'
import {createAccount} from '../../services/accountService'

export default class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      snackBarColor: '',
      snackBarText: '',
      firstName: '',
      lastName: '',
      email: '',
      password1: '',
      password2: ''
    };
  }

  componentDidMount() {
    AccountStore.addChangeListener(this._handleServerResponse.bind(this))
  }

  componentWillUnmount() {
    AccountStore.removeChangeListener(this._handleServerResponse.bind(this))
  }

  _handleServerResponse() {
    let accountCreated = AccountStore.getAccountCreated()
    let error = AccountStore.getError()

    if (accountCreated) {
      this.setState({
        open: true,
        snackBarColor: "#27ae60",
        snackBarText: "Account created successfully. Please check " +
        "your e-mail to activate your account."
      })
    } else if (error !== null) {
      this.setState({
        open: true,
        snackBarColor: "#F44336",
        snackBarText: error
      })
    }
  }

  _setFirstName(e) {
    this.setState({
      firstName: e.target.value,
      open: false
    })
  }

  _setLastName(e) {
    this.setState({
      lastName: e.target.value,
      open: false
    })
  }

  _setEmail(e) {
    this.setState({
      email: e.target.value,
      open: false
    })
  }

  _setPassword1(e) {
    this.setState({
      password1: e.target.value,
      open: false
    })
  }

  _setPassword2(e) {
    this.setState({
      password2: e.target.value,
      open: false
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

    let error = null

    if (this.state.firstName === '') {
      error = "First name missing."
    }

    if (this.state.firstName.length > 30) {
      error = "First name is too long."
    }

    if (this.state.lastName === '') {
      error = "Last name missing."
    }

    if (this.state.lastName.length > 30) {
      error = "Last name is too long."
    }

    if (this.state.email === '') {
      error = "Email missing."
    }

    if (this.state.email.length > 100) {
      error = "Email is too long."
    }

    if (!this._validateEmail(this.state.email)) {
      error = "Email is not valid."
    }

    if (this.state.password1 === '' || this.state.password2 === '') {
      error = "Password missing."
    }

    if (this.state.password1.length > 30 || this.state.password1.length < 6) {
      error = "Password has to be between 6 and 30 characters."
    }

    if (this.state.password1 !== this.state.password2) {
      error = "Passwords do not match."
    }

    if (error === null) {
      createAccount(this.state.firstName, this.state.lastName,
        this.state.email, this.state.password1)
    } else {
      this.setState({
        open: true,
        snackBarColor: "#F44336",
        snackBarText: error
      })
    }
  }

  _handleSnackBarClose() {
    this.setState({
      open: false
    })
  }

  _handleKeyPress(event) {
    if (event.key == 'Enter') {
      this._createAccount(event)
    }
  }

  render() {
    return (
      <div className="login-screen">
        <div className="login-outter">
          <div className="login-inner">
            <Paper className="login-div" zDepth={5}>
              <img className="login-logo" src={logoTitleImage}/>
              <div className="login-form-div">
                <form className="login-form">
                  <div className="db">
                    <div className="dib w4 mr1">
                      <TextField type="text"
                                 value={this.state.user}
                                 onChange={this._setFirstName.bind(this)}
                                 style={{width: "auto"}}
                                 id="firstName"
                                 onKeyPress={this._handleKeyPress.bind(this)}
                                 placeholder="First Name"/>
                    </div>
                    <div className="dib w4 ml1">
                      <TextField type="text"
                                 value={this.state.user}
                                 onChange={this._setLastName.bind(this)}
                                 style={{width: "auto"}}
                                 id="lastName"
                                 onKeyPress={this._handleKeyPress.bind(this)}
                                 placeholder="Last Name"/>
                    </div>
                  </div>
                  <div className="">
                    <TextField type="text"
                               value={this.state.user}
                               onChange={this._setEmail.bind(this)}
                               className="form-control"
                               id="username"
                               onKeyPress={this._handleKeyPress.bind(this)}
                               placeholder="Email"/>
                  </div>
                  <div className="">
                    <TextField type="password"
                               value={this.state.password1}
                               onChange={this._setPassword1.bind(this)}
                               className="form-control"
                               id="password"
                               ref="password"
                               onKeyPress={this._handleKeyPress.bind(this)}
                               placeholder="Password"/>
                  </div>
                  <div className="">
                    <TextField type="password"
                               value={this.state.password2}
                               onChange={this._setPassword2.bind(this)}
                               className="form-control"
                               id="password"
                               ref="password"
                               onKeyPress={this._handleKeyPress.bind(this)}
                               placeholder="Repeat Password"/>
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
            </Paper>
          </div>
        </div>
        <Snackbar message={this.state.snackBarText}
                  bodyStyle={{
                    backgroundColor: this.state.snackBarColor, fontFamily: "Header-Font",
                    textAlign: "center"
                  }}
                  autoHideDuration={8000} open={this.state.open}/>
      </div>
    );
  }
}