import AppDispatcher from '../dispatchers/appDispatcher';
import NoAuthConstants from '../constants/noAuthConstants.js';

export const notify = (message) => {
  AppDispatcher.dispatch({
    actionType: NoAuthConstants.NOTIFY,
    message: message,
    color: "#2980b9"
  })
};

export const success = (message) => {
  AppDispatcher.dispatch({
    actionType: NoAuthConstants.NOTIFY,
    message: message,
    color: "#27ae60"
  })
};