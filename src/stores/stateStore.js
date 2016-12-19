import AppDispatcher from '../dispatchers/appDispatcher'
import BaseStore from './baseStore';
import StateConstants from '../constants/stateConstants.js';
import assign from 'object-assign'

var _phrase = {}
var _botId = "ciwurr2ut8j790124g0pgnex6"
var _error = ""

var StateStore = assign({}, BaseStore, {
    getCurrentPhrase() {
        return _phrase
    },
    
    getCurrentBotId() {
        return _botId
    }
});

AppDispatcher.register(function(action) {
    switch(action.actionType) {
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