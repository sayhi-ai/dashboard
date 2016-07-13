import request from 'reqwest';
import when from 'when';
import LoginConstants from '../constants/loginConstants.js';
import {loginAction, logoutAction} from '../actions/loginActions';

export var login = function (email, password) {
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
            loginAction(jwt);
            return true;
        });
}