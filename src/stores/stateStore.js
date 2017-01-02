import AppDispatcher from '../dispatchers/appDispatcher'
import BaseStore from './baseStore';
import StateConstants from '../constants/stateConstants.js';
import assign from 'object-assign'

var _phrase = {}
var _botId = "cixf3et6c5io4010759dn050r"
var _error = null

var StateStore = assign({}, BaseStore, {
  getDashboardError() {
    return _error
  },

  getCurrentPhrase() {
    return _phrase
  },

  getCurrentBotId() {
    return _botId
  }
});

AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case StateConstants.UPDATE_PHRASE:
      if (action.phrase !== "") {
        _phrase = action.phrase
        StateStore.emitChange()
      }
      break
    case StateConstants.ERROR:
      if (action.phrase !== "") {
        _error = action.error
        console.log(_error)
        StateStore.emitChange()
      }
      break

    default:
    // no op
  }
})

export default StateStore