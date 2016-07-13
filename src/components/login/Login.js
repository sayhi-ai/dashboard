import React from 'react';
import {login} from '../../services/authService'
import TextField from "material-ui/TextField"
import RaisedButton from "material-ui/RaisedButton"
import Paper from "material-ui/Paper"
import logoTitleImage from "../../resources/img/logowithtext.png"
import when from 'when';

export default class Login extends React.Component {
  
    constructor() {
        super()
        this.state = {
            user: '',
            password: ''
        };
    }
    
    _setUsername(e) {
        this.setState({
            user: e.target.value,
            password: this.state.password
        })
    }

    _setPassword(e) {
        this.setState({
            user: this.state.user,
            password: e.target.value
        })
    }

    _login(e) {
        e.preventDefault();
        login(this.state.user, this.state.password)
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
                                                   placeholder="Email" />
                                    </div>
                                    <div className="">
                                        <TextField type="password"
                                                   value={this.state.password}
                                                   onChange={this._setPassword.bind(this)}
                                                   className="form-control" 
                                                   id="password" 
                                                   ref="password" 
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
                                </form>
                            </div>
                        </Paper>
                    </div>
                </div>
            </div>
        );
    }
}