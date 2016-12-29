import AppDispatcher from '../dispatchers/appDispatcher'
import BaseStore from './baseStore';
import NoAuthConstants from '../constants/noAuthConstants.js';
import assign from 'object-assign'

let _message = null;
let _color = null

const NoAuthStore = assign({}, BaseStore, {
  getMessage() {
    return _message;
  },
  getColor() {
    return _color;
  }
});

AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case NoAuthConstants.MESSAGE:
      if (action.message !== null || action.message !== "") {
        _message = action.message
        _color = action.color
        NoAuthStore.emitChange()
      }
      break
      // no op
  }
})

export default NoAuthStore