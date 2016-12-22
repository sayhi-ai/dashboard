import AppDispatcher from '../dispatchers/appDispatcher'
import BaseStore from './baseStore';
import AccountConstants from '../constants/accountConstants.js';
import assign from 'object-assign'

var _accountCreated = false
var _error = null

var AccountStore = assign({}, BaseStore, {
    getAccountCreated() {
        return _accountCreated
    },

    getError() {
        return _error
    }
});

AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case AccountConstants.CREATE:
            _accountCreated = true
            _error = null
            AccountStore.emitChange()
            break
        case AccountConstants.ERROR:
            if (action.error !== null || action.error !== "") {
                _accountCreated = false
                _error = action.error
                console.log(_error)
                AccountStore.emitChange()
            }
            break

        default:
        // no op
    }
})

export default AccountStore