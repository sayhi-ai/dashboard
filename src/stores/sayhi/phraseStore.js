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
})

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
    case PhraseConstants.UPDATE_PHRASE:
      if (action.phrase !== null) {
        const index = _phrases.findIndex(phrase => phrase.id === action.phrase.id)

        if (index !== null) {
          _phrases = _phrases.set(index, action.phrase)
          PhraseStore.emitChange()
        }
      }
      break
    case PhraseConstants.REMOVE_PHRASE:
      if (action.id !== null) {
        const index = _phrases.findIndex(phrase => phrase.id === action.phrase.id)

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