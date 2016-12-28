import AppDispatcher from '../dispatchers/appDispatcher';
import NoAuthConstants from '../constants/noAuthConstants.js';

export const notfify = (message) => {
  AppDispatcher.dispatch({
    actionType: NoAuthConstants.NOTIFY,
    message: message
  })
};