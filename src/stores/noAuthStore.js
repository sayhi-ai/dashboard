import AppDispatcher from '../dispatchers/appDispatcher'
import BaseStore from './baseStore';
import NoAuthConstants from '../constants/noAuthConstants.js';
import assign from 'object-assign'

let _message = null;

const NoAuthStore = assign({}, BaseStore, {
  getMessage() {
    return _message;
  }
});

AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case NoAuthConstants.NOTIFY:
      if (action.message !== null || action.message !== "") {
        _message = action.message
        NoAuthStore.emitChange()
      }
      break
      // no op
  }
})

export default NoAuthStore