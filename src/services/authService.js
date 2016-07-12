import request from 'reqwest';
import when from 'when';
import LoginConstants from '../constants/loginConstants.js';
import LoginActions from '../actions/loginActions';

export var login = function (email, password) {
    console.log(LoginConstants.LOGIN_URL)
    return handleAuth(when(request({
        url: LoginConstants.LOGIN_URL,
        method: 'POST',
        type: 'application/json',
        data: {
            email, password
        }
    })));
}

export var logout = function () {
    LoginActions.logoutUser();
}

export var handleAuth = function(loginPromise) {
    return loginPromise
        .then(function(response) {
            var jwt = response.id_token;
            LoginActions.loginUser(jwt);
            return true;
        });
}