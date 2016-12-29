import AppDispatcher from '../dispatchers/appDispatcher';
import NoAuthConstants from '../constants/noAuthConstants.js';

export const notify = (message) => {
  AppDispatcher.dispatch({
    actionType: NoAuthConstants.MESSAGE,
    message: message,
    color: "#2196F3"
  })
};

export const success = (message) => {
  AppDispatcher.dispatch({
    actionType: NoAuthConstants.MESSAGE,
    message: message,
    color: "#27ae60"
  })
};