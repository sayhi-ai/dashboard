import AppDispatcher from '../dispatchers/appDispatcher';
import AccountConstants from '../constants/accountConstants.js';

export const createAccount = () => {
  AppDispatcher.dispatch({
    actionType: AccountConstants.CREATE
  })
}