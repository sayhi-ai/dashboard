import AppDispatcher from '../dispatchers/appDispatcher'
import BaseStore from './baseStore';
import SayHiConstants from '../constants/sayhiConstants.js';
import assign from 'object-assign'

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
                _phrases = new Set(action.phrases)
                _error = null
                SayHiStore.emitChange()
            }
            break
        case SayHiConstants.GET_RESPONSES:
            if (action.responses) {
                _responses = new Set(action.responses)
                _error = null
                SayHiStore.emitChange()
            }
            break
        case SayHiConstants.ADD_RESPONSE:
            if (action.response) {
                console.log("get here32 ")
                _responses.push(action.response)
                _error = null
                SayHiStore.emitChange()
            }
            break
        case SayHiConstants.ERROR:
            if (action.error) {
                _error = action.error
                SayHiStore.emitChange()
            }
            break
        default:
        // no op
    }
})

export default SayHiStore