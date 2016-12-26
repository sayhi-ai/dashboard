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
    case BotContstants.REMOVE_BOT:
      if (action.id !== null) {
        let index = null
        for (let i = 0; i < _bots.size; i++) {
          if (_bots.get(i).id === action.id) {
            index = i
          }
        }

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