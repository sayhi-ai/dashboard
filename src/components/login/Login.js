import React from 'react';
import {login} from '../../services/authService'
import TextField from "material-ui/TextField"
import RaisedButton from "material-ui/RaisedButton"
import Paper from "material-ui/Paper"
import LoginStore from "../../stores/loginStore"
import logoTitleImage from "../../resources/img/logowithtext.png"
import Snackbar from "material-ui/Snackbar"

export default class Login extends React.Component {

    constructor() {
        super()
        this.state = {
            open: false,
            snackBarColor: '',
            snackBarText : '',
            user: '',
            password: ''
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
        login(this.state.user, this.state.password)
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
                                    <div className="">
                                        <TextField type="text"
                                                   value={this.state.user}
                                                   onChange={this._setUsername.bind(this)}
                                                   className="form-control"
                                                   id="username"
                                                   onKeyPress={this._handleKeyPress.bind(this)}
                                                   placeholder="Email" />
                                    </div>
                                    <div className="">
                                        <TextField type="password"
                                                   value={this.state.password}
                                                   onChange={this._setPassword.bind(this)}
                                                   className="form-control" 
                                                   id="password" 
                                                   ref="password"
                                                   onKeyPress={this._handleKeyPress.bind(this)}
                                                   placeholder="Password" />
                                    </div>
                                    <div className="login-error-field">{this.props.loginError}</div>
                                    <div className="login-button">
                                        <RaisedButton type="submit"
                                                      labelStyle={{color:"#FFFFFF"}}
                                                      primary={true}
                                                      onClick={this._login.bind(this)}
                                                      label="Login"/>
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
                          autoHideDuration={8000} open={this.state.open}
                          handleClose={this._handleSnackBarClose.bind(this)}/>
            </div>
        );
    }
}