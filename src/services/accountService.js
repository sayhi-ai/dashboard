import fetch from "isomorphic-fetch";
import AccountConstants from "../constants/accountConstants"
import * as accountActions from '../actions/accountActions';

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
          accountActions.createAccount()
        } else {
          accountActions.errorCreateAccount(json.message)
        }
      });
    } else {
      serverResponse.json().then(json => {
        accountActions.errorCreateAccount(json.error)
      });
    }
  });
}