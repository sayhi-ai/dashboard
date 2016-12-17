import fetch from "isomorphic-fetch";
import LoginConstants from "../constants/loginConstants"
import {loginAction, errorLoginAction, logoutAction} from '../actions/loginActions';

export var login = function (email, password) {
    localStorage.setItem('sayhi-user', email)
    return handleAuth(fetch(LoginConstants.LOGIN_URL, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    }));
}

export var logout = function () {
    localStorage.removeItem('sayhi-user')
    logoutAction();
}

export var handleAuth = function (promise) {
    promise.then(response => {
        if (response.status === 200) {
            response.json().then(json => {
                loginAction(json.token)
            });
        } else {
            response.json().then(json => {
                errorLoginAction(json.error)
            });
        }
    });
}