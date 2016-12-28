import AppDispatcher from '../dispatchers/appDispatcher'
import BaseStore from './baseStore';
import ErrorConstants from '../constants/errorConstants.js';
import assign from 'object-assign'

let _dashboardError = null;
let _noAuthError = null;

const StateStore = assign({}, BaseStore, {
  getDashboardError() {
    return _dashboardError
  },
  getNoAuthError() {
    return _noAuthError
  }
});

AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case ErrorConstants.DASHBOARD:
      if (action.error !== null || action.error !== "") {
        _dashboardError = action.error;
        _noAuthError = null;

        console.log(_dashboardError);
        StateStore.emitChange()
      }
      break;
    case ErrorConstants.NO_AUTH:
      if (action.error !== null || action.error !== "") {
        _noAuthError = action.error;
        _dashboardError = null;

        console.log(_noAuthError);
        StateStore.emitChange()
      }
      break;

    default:
    // no op
  }
});

export default StateStore