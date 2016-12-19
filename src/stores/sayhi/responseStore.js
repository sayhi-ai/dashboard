import AppDispatcher from '../../dispatchers/appDispatcher'
import BaseStore from './../baseStore';
import ResponseConstants from '../../constants/sayhi/responseConstants';
import assign from 'object-assign'
var Immutable = require('immutable');

var _responses = []

var ResponseStore = assign({}, BaseStore, {
    getResponses() {
        return _responses
    }
});

AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case ResponseConstants.GET_RESPONSES:
            if (action.responses) {
                _responses = Immutable.List(action.responses).toSet().toList()
                ResponseStore.emitChange()
            }
            break
        case ResponseConstants.ADD_RESPONSE:
            if (action.response !== null) {
                _responses = _responses.push(action.response)
            } else {
                ResponseStore.emitChange()
            }
            break
        default:
        // no op
    }
})

export default ResponseStore