import React from 'react';
import addons from 'react-addons'
import ReactMixin from 'react-mixin';
import Auth from '../../services/authService'

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
            <div className="login jumbotron center-block">
                <h1>Login</h1>
                <form role="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text"
                               value={this.linkState('user')}
                               onChange={this.linkState('user')}
                               className="form-control"
                               id="username"
                               placeholder="Username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password"
                               value={this.linkState('password')}
                               onChange={this.linkState('password')}
                               className="form-control"
                               id="password"
                               ref="password"
                               placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-default" onClick={this._login.bind(this)}>Submit</button>
                </form>
            </div>
        );
    }
}

ReactMixin(Login.prototype, addons.LinkedStateMixin);