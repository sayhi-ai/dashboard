import fetch from "isomorphic-fetch";
import AccountConstants from "../constants/accountConstants"
import * as noAuthActions from '../actions/noAuthAction';
import * as errorActions from '../actions/errorAction';

export const createAccount = function (firstName, lastName, email, password) {
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
          noAuthActions.notfify("Account created successfully. Please check your e-mail to activate your account.")
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