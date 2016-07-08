import React from 'react';
import addons from 'react-addons'
import ReactMixin from 'react-mixin';
import Auth from '../../services/authService'
import TextField from "material-ui/TextField"
import RaisedButton from "material-ui/RaisedButton"

export default class Login extends React.Component {
  
    constructor() {
        super()
        this.state = {
            user: '',
            password: ''
        };
    }

    _login(e) {
        e.preventDefault();
        Auth.login(this.state.user, this.state.password)
            .catch(function(err) {
                alert("There's an error logging in");
                console.log("Error logging in", err);
            });
    }

    render() {
        return (
            <div className="login-screen">
                <div className="login-outter">
                    <div className="login-inner">
                        <form className="login-form">
                            <div className="">
                                <TextField type="text"
                                       onChange={this.linkState('user')}
                                       className="form-control"
                                       id="username"
                                       placeholder="Username" />
                            </div>
                            <div className="">
                                <TextField type="password"
                                       onChange={this.linkState('password')}
                                       className="form-control"
                                       id="password"
                                       ref="password"
                                       placeholder="Password" />
                            </div>
                            <RaisedButton type="submit" className="" onClick={this._login.bind(this)}>Submit</RaisedButton>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

ReactMixin(Login.prototype, addons.LinkedStateMixin);