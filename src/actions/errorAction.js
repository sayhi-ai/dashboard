import AppDispatcher from '../dispatchers/appDispatcher';
import ErrorConstants from '../constants/errorConstants.js';

export const handleDashboardError = (error) => {
  AppDispatcher.dispatch({
    actionType: ErrorConstants.DASHBOARD,
    error: error
  })
};

export const handleNoAuthError = (error) => {
  AppDispatcher.dispatch({
    actionType: ErrorConstants.NO_AUTH,
    error: error
  })
};