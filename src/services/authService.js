import request from 'reqwest';
import when from 'when';
import LoginConstants from '../constants/loginConstants.js';
import {loginAction, logoutAction} from '../actions/loginActions';

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
    logoutAction();
}

export var handleAuth = function(loginPromise) {
    return loginPromise
        .then(function(response) {
            var jwt = response.response;
            console.log(jwt)
            loginAction(jwt);
            return true;
        });
}