import fetch from "isomorphic-fetch";
import LoginConstants from "../constants/loginConstants"
import * as loginActions from '../actions/loginActions';

export const login = function (email, password) {
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

export const logout = function () {
  localStorage.removeItem('sayhi-user')
  loginActions.logout();
}

export const handleAuth = function (promise) {
  promise.then(response => {
    if (response.status === 200) {
      response.json().then(json => {
        loginActions.login(json.token)
      });
    } else {
      response.json().then(json => {
        loginActions.errorLogin(json.error)
      });
    }
  });
}