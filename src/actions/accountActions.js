import AppDispatcher from '../dispatchers/appDispatcher';
import AccountConstants from '../constants/accountConstants.js';

export const createAccount = function () {
  AppDispatcher.dispatch({
    actionType: AccountConstants.CREATE
  })
}

export const errorCreateAccount = function (error) {
  AppDispatcher.dispatch({
    actionType: AccountConstants.ERROR,
    error: error
  })
}