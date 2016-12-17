import LoginConstants from '../constants/loginConstants';
import BaseStore from './baseStore';
import AppDispatcher from "../dispatchers/appDispatcher"
import jwt_decode from 'jwt-decode';
import assign from 'object-assign'

var _user, _jwt, _error
var LoginStore = assign({}, BaseStore, {
    getUser: function() {
        return _user
    },

    getJwt: function() {
        return _jwt
    },

    isLoggedIn: function() {
        return !!_user
    },

    getLoginError: function() {
        return _error
    },
})

AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case LoginConstants.LOGIN_USER:
            _jwt = action.jwt
            _user = jwt_decode(_jwt)
            _error = null
            LoginStore.emitChange()
            break;
        case LoginConstants.LOGOUT_USER:
            _user = null
            _jwt = null
            _error = null
            LoginStore.emitChange()
            break
        case LoginConstants.LOGIN_ERROR:
            _user = null
            _jwt = null
            _error = action.error
            LoginStore.emitChange()
        default:
            break
    }
})

export default LoginStore