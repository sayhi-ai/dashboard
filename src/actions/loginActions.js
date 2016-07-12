import AppDispatcher from '../dispatchers/appDispatcher'
import LoginConstants from '../constants/loginConstants.js'
import { browserHistory } from 'react-router'

export var loginAction = function(jwt) {
    var savedJwt = localStorage.getItem('sayhi-jwt')

    AppDispatcher.dispatch({
        actionType: LoginConstants.LOGIN_USER,
        jwt: jwt
    })

    if (savedJwt !== jwt) {
        browserHistory.push('/dashboard')
        localStorage.setItem('sayhi-jwt', jwt)
    }
}

export var logoutAction = function() {
    browserHistory.push('/login')
    localStorage.removeItem('sayhi-jwt')
    AppDispatcher.dispatch({
        actionType: LoginConstants.LOGOUT_USER
    })
}