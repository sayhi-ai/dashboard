import React from 'react';
import TextField from "material-ui/TextField"
import RaisedButton from "material-ui/RaisedButton"
import Paper from "material-ui/Paper"
import LoginStore from "../../stores/loginStore"
import logoTitleImage from "../../resources/img/logowithtext.png"
import Snackbar from "material-ui/Snackbar"
import browserHistory from '../../history'

export default class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            snackBarColor: '',
            snackBarText : '',
            firstName: '',
            lastName: '',
            email: '',
            password1: '',
            password2: ''
        };
    }

    componentDidMount() {
        LoginStore.addChangeListener(this._handleLoginChange.bind(this))
    }

    componentWillUnmount() {
        LoginStore.removeChangeListener(this._handleLoginChange.bind(this))
    }

    _handleLoginChange() {
        let error = LoginStore.getLoginError()
        if (error !== null) {
            this.setState({
                open: true,
                snackBarColor: "#F44336",
                snackBarText : "Wrong username or password."
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

    _login(e) {
        e.preventDefault()
        browserHistory.push('/login');
    }

    _createAccount(e) {

    }

    _handleSnackBarClose() {
        this.setState({
            open: false
        })
    }

    _handleKeyPress(event) {
        if(event.key == 'Enter'){
            this._login(event)
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
                                        <div className="dib w4">
                                            <TextField type="text"
                                                       value={this.state.user}
                                                       onChange={this._setFirstName.bind(this)}
                                                       style={{width: "auto"}}
                                                       id="firstName"
                                                       onKeyPress={this._handleKeyPress.bind(this)}
                                                       placeholder="First Name" />
                                        </div>
                                        <div className="dib w4">
                                            <TextField type="text"
                                                       value={this.state.user}
                                                       onChange={this._setLastName.bind(this)}
                                                       style={{width: "auto"}}
                                                       id="lastName"
                                                       onKeyPress={this._handleKeyPress.bind(this)}
                                                       placeholder="Last Name" />
                                        </div>
                                    </div>
                                    <div className="">
                                        <TextField type="text"
                                                   value={this.state.user}
                                                   onChange={this._setEmail.bind(this)}
                                                   className="form-control"
                                                   id="username"
                                                   onKeyPress={this._handleKeyPress.bind(this)}
                                                   placeholder="Email" />
                                    </div>
                                    <div className="">
                                        <TextField type="password"
                                                   value={this.state.password1}
                                                   onChange={this._setPassword1.bind(this)}
                                                   className="form-control"
                                                   id="password"
                                                   ref="password"
                                                   onKeyPress={this._handleKeyPress.bind(this)}
                                                   placeholder="Password" />
                                    </div>
                                    <div className="">
                                        <TextField type="password"
                                                   value={this.state.password2}
                                                   onChange={this._setPassword2.bind(this)}
                                                   className="form-control"
                                                   id="password"
                                                   ref="password"
                                                   onKeyPress={this._handleKeyPress.bind(this)}
                                                   placeholder="Repeat Password" />
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
                                                          labelStyle={{color:"#19A5E4"}}
                                                          primary={false}
                                                          onClick={this._login.bind(this)}
                                                          label="Login"/>
                                        </div>
                                        <div className="create-account-button">
                                            <RaisedButton type="submit"
                                                          labelStyle={{color:"#FFFFFF"}}
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
                          bodyStyle={{backgroundColor: this.state.snackBarColor, fontFamily: "Header-Font",
                              textAlign: "center"}}
                          autoHideDuration={8000} open={this.state.open}/>
            </div>
        );
    }
}