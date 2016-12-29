import fetch from "isomorphic-fetch";
import AccountConstants from "../constants/accountConstants"
import * as noAuthActions from '../actions/noAuthAction';
import * as errorActions from '../actions/errorAction';
import platform from 'platform';

export const createAccount = (firstName, lastName, email, password) => {
  return fetch(AccountConstants.CREATE_URL, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "password": password
    })
  }).then(serverResponse => {
    if (serverResponse.status === 200) {
      serverResponse.json().then(json => {
        if (json.created) {
          noAuthActions.success("Account created successfully. Please check your e-mail to activate your account.")
        } else {
          errorActions.handleNoAuthError(json.message)
        }
      });
    } else {
      serverResponse.json().then(json => {
        errorActions.handleNoAuthError(json.error)
      });
    }
  });
}

export const sendPasswordResetCode = (email) => {
  return fetch(AccountConstants.PASSWORD_RESET_EMAIL_URL, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "email": email,
      "device": platform.description,
    })
  }).then(serverResponse => {
    if (serverResponse.status === 200) {
      return serverResponse.json().then(json => {
        noAuthActions.notify("A password reset code was sent to your email. It will be active for 30 min.")
        return true;
      });
    } else {
      return serverResponse.json().then(json => {
        errorActions.handleNoAuthError(json.detail)
        return false;
      });
    }
  });
}

export const resetPassword = (email, code, password) => {
  return fetch(AccountConstants.PASSWORD_RESET_URL, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "email": email,
      "code": code,
      "password": password
    })
  }).then(serverResponse => {
    if (serverResponse.status === 200) {
      return serverResponse.json().then(json => {
        noAuthActions.success("Successfully changed your password.")
        return true;
      });
    } else {
      return serverResponse.json().then(json => {
        errorActions.handleNoAuthError(json.detail)
        return false;
      });
    }
  });
}