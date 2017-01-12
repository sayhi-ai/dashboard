import AppDispatcher from '../../dispatchers/appDispatcher'
import BaseStore from './../baseStore';
import BotContstants from '../../constants/sayhi/botConstants';
import assign from 'object-assign'
import Immutable from 'immutable'

let _bots = Immutable.List();

const BotStore = assign({}, BaseStore, {
  getBots() {
    return _bots
  }
});

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case BotContstants.GET_BOTS:
      if (action.bots.length > 0) {
        _bots = Immutable.List(action.bots)
        BotStore.emitChange()
      }
      break
    case BotContstants.ADD_BOT:
      if (action.bot !== null) {
        _bots = _bots.push(action.bot)
        BotStore.emitChange()
      }
      break
    case BotContstants.UPDATE_BOT:
      if (action.bot !== null) {
        const index = _bots.findIndex(bot => bot.id === action.bot.id)

        if (index !== null) {
          _bots = _bots.set(index, action.bot)
          BotStore.emitChange()
        }
      }
      break
    case BotContstants.REMOVE_BOT:
      if (action.id !== null) {
        const index = _bots.findIndex(bot => bot.id === action.id)

        if (index !== null) {
          _bots = _bots.delete(index)
          BotStore.emitChange()
        }
      }
      break
    default:
    // no op
  }
})

export default BotStore