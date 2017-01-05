import AppDispatcher from '../../dispatchers/appDispatcher'
import BaseStore from './../baseStore'
import PhraseConstants from '../../constants/sayhi/phraseConstants'
import assign from 'object-assign'
import Immutable from 'immutable'

let _phrases = Immutable.List();

const PhraseStore = assign({}, BaseStore, {
  getPhrases() {
    return _phrases
  }
});

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case PhraseConstants.SET_PHRASES:
      if (action.phrases.length > 0) {
        _phrases = Immutable.List(action.phrases)
        PhraseStore.emitChange()
      }
      break
    case PhraseConstants.ADD_PHRASE:
      if (action.phrase !== null) {
        _phrases = _phrases.push(action.phrase)
        PhraseStore.emitChange()
      }
      break
    case PhraseConstants.REMOVE_PHRASE:
      if (action.id !== null) {
        let index = null
        for (let i = 0; i < _phrases.size; i++) {
          if (_phrases.get(i).id === action.id) {
            index = i
          }
        }

        if (index !== null) {
          _phrases = _phrases.delete(index)
          PhraseStore.emitChange()
        }
      }
      break
    default:
    // no op
  }
})

export default PhraseStore