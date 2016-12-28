import AppDispatcher from '../dispatchers/appDispatcher'
import LoginConstants from '../constants/loginConstants.js'
import browserHistory from '../history'

export const login = (jwt) => {
  const savedJwt = localStorage.getItem('sayhi-jwt')

  AppDispatcher.dispatch({
    actionType: LoginConstants.LOGIN_USER,
    jwt: jwt
  });

  if (savedJwt !== jwt) {
    localStorage.setItem('sayhi-jwt', jwt)
  }

  browserHistory.push('/dashboard')
};

export const logout = () => {
  localStorage.removeItem('sayhi-jwt');
  AppDispatcher.dispatch({
    actionType: LoginConstants.LOGOUT_USER
  });
  browserHistory.push('/noAuth')
};