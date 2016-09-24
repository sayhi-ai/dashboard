// import request from 'reqwest';
import when from 'when';
import LoginConstants from '../constants/loginConstants.js';
import {loginAction, logoutAction} from '../actions/loginActions';

export var login = function (email, password) {
    localStorage.setItem('sayhi-user', 'hello')
    loginAction("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ")
    
    return true
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