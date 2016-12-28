import AppDispatcher from '../dispatchers/appDispatcher'
import BaseStore from './baseStore';
import AccountConstants from '../constants/accountConstants.js';
import assign from 'object-assign'

let _accountCreated = false
let _resetEmail = null;

const AccountStore = assign({}, BaseStore, {
  getAccountCreated() {
    return _accountCreated
  },
  getResetEmail() {
    return _resetEmail;
  }
});

AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case AccountConstants.CREATE:
      _accountCreated = true
      AccountStore.emitChange()
      break
    case AccountConstants.SET_EMAIL_FOR_RESET:
      _resetEmail = action.email
      AccountStore.emitChange()
      break
    default:
    // no op
  }
})

export default AccountStore