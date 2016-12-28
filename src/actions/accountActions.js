import AppDispatcher from '../dispatchers/appDispatcher';
import AccountConstants from '../constants/accountConstants.js';

export const createAccount = () => {
  AppDispatcher.dispatch({
    actionType: AccountConstants.CREATE
  })
}

export const setEmailForReset = (email) => {
  AppDispatcher.dispatch({
    actionType: AccountConstants.SET_EMAIL_FOR_RESET,
    email: email
  })
}