import AppDispatcher from '../../dispatchers/appDispatcher'
import BaseStore from './../baseStore';
import ResponseConstants from '../../constants/sayhi/responseConstants';
import assign from 'object-assign'
var Immutable = require('immutable');

var _responses = Immutable.List();

var ResponseStore = assign({}, BaseStore, {
    getResponses() {
        return _responses
    }
});

AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case ResponseConstants.GET_RESPONSES:
            if (action.responses.length > 0) {
                _responses = Immutable.List(action.responses)
                ResponseStore.emitChange()
            }
            break
        case ResponseConstants.ADD_RESPONSE:
            if (action.response !== null) {
                _responses = _responses.push(action.response)
                ResponseStore.emitChange()
            }
            break
        case ResponseConstants.REMOVE_RESPONSE:
            if (action.id !== null) {
                let index = null
                for (let i = 0; i < _responses.size; i++) {
                    if (_responses.get(i).id === action.id) {
                        index = i
                    }
                }

                if (index !== null) {
                    _responses = _responses.delete(index)
                    ResponseStore.emitChange()
                }
            }
            break
        default:
        // no op
    }
})

export default ResponseStore