import {LOGIN_USER, LOGOUT_USER} from '../constants/LoginConstants';
import BaseStore from './baseStore';
import AppDispatcher from "../dispatchers/appDispatcher"
import jwt_decode from 'jwt-decode';

var _user, _jwt
var LoginStore = assign({}, BaseStore, {
    getUser: function() {
        return _user
    },

    getJwt: function() {
        return _jwt
    },

    isLoggedIn: function() {
        return !!_user
    }
})

AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case LOGIN_USER:
            _jwt = action.jwt
            _user = jwt_decode(_jwt)
            LoginStore.emitChange()
            break;
        case LOGOUT_USER:
            _user = null
            LoginStore.emitChange()
            break
        default:
            break
    }
})

export default LoginStore