import AppDispatcher from '../dispatchers/appDispatcher'
import BaseStore from './baseStore';
import ErrorConstants from '../constants/errorConstants.js';
import assign from 'object-assign'

var _error = null

var StateStore = assign({}, BaseStore, {
    getError() {
        return _error
    }
});

AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case ErrorConstants.ERROR:
            if (action.error !== null || action.error !== "") {
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