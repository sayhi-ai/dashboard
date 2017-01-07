import AppDispatcher from '../dispatchers/appDispatcher'
import BaseStore from './baseStore';
import DashboardConstants from '../constants/dashboardConstants.js';
import assign from 'object-assign'

let _phrase = null
let _bot = null

const DashboardStore = assign({}, BaseStore, {
  getCurrentPhrase() {
    return _phrase
  },

  getCurrentBot() {
    return _bot
  }
});

AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case DashboardConstants.UPDATE_PHRASE:
      if (action.phrase !== null) {
        _phrase = action.phrase
        DashboardStore.emitChange()
      }
      break
    case DashboardConstants.UPDATE_BOT:
      if (action.bot !== null) {
        _bot = action.bot
        DashboardStore.emitChange()
      }
      break
    default:
    // no op
  }
})

export default DashboardStore