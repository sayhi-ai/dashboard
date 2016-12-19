import AppDispatcher from '../../dispatchers/appDispatcher'
import BaseStore from './../baseStore';
import PhraseConstants from '../../constants/sayhi/phraseConstants';
import assign from 'object-assign'
var Immutable = require('immutable');

var _phrases = []

var PhraseStore = assign({}, BaseStore, {
    getPhrases() {
        return _phrases
    },
    getError() {
        return _error
    }
});

AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case PhraseConstants.GET_PHRASES:
            if (action.phrases) {
                _phrases = Immutable.List(action.phrases).toSet().toList()
                PhraseStore.emitChange()
            }
            break
        case PhraseConstants.ADD_PHRASE:
            if (action.phrases !== null) {
                _phrases = _phrases.push(action.phrase)
                PhraseStore.emitChange()
            }
            break
        default:
        // no op
    }
})

export default PhraseStore