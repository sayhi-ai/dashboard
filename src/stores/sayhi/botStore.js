import AppDispatcher from '../../dispatchers/appDispatcher'
import BaseStore from './../baseStore';
import SayHiConstants from '../../constants/sayhi/';
import assign from 'object-assign'
var Immutable = require('immutable');

var _phrases = []
var _responses = []
var _error = null

var SayHiStore = assign({}, BaseStore, {
    getPhrases() {
        return _phrases
    },
    getResponses() {
        return _responses
    },
    getError() {
        return _error
    }
});

AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case SayHiConstants.GET_PHRASES:
            if (action.phrases) {
                _phrases = Immutable.List(action.phrases).toSet().toList()
                SayHiStore.emitChange()
            }
            break
        default:
        // no op
    }
})

export default SayHiStore