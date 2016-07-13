import request from 'reqwest';
import when from 'when';
import LoginConstants from '../constants/loginConstants.js';
import {loginAction, logoutAction} from '../actions/loginActions';

export var login = function (email, password) {
    localStorage.setItem('sayhi-user', email)
    
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
    localStorage.removeItem('sayhi-user')
    logoutAction();
}

export var handleAuth = function(loginPromise) {
    return loginPromise
        .then(function(response) {
            var jwt = response.response.substring(1, response.response.length - 1);
            loginAction(jwt)
            return true  
        })
        .catch(function(error) {
            console.log(error)
            return false
        })
}