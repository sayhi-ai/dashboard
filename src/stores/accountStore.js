import AppDispatcher from '../dispatchers/appDispatcher'
import BaseStore from './baseStore';
import AccountConstants from '../constants/accountConstants.js';
import assign from 'object-assign'

let _accountCreated = false

const AccountStore = assign({}, BaseStore, {
  getAccountCreated() {
    return _accountCreated
  }
});

AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case AccountConstants.CREATE:
      _accountCreated = true
      AccountStore.emitChange()
      break
    default:
    // no op
  }
})

export default AccountStore