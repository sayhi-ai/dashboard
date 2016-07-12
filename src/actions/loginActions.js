import AppDispatcher from '../dispatchers/appDispatcher';
import LoginConstants from '../constants/loginConstants.js';
import RouterContainer from '../services/routerContainer'

export default {
    loginUser: (jwt) => {
        var savedJwt = localStorage.getItem('sayhi-jwt');

        AppDispatcher.dispatch({
            actionType: LoginConstants.LOGIN_USER,
            jwt: jwt
        });

        if (savedJwt !== jwt) {
            var nextPath = RouterContainer.get().getCurrentQuery().nextPath || '/';

            RouterContainer.get().transitionTo(nextPath);
            localStorage.setItem('sayhi-jwt', jwt);
        }
    },
    logoutUser: () => {
        RouterContainer.get().transitionTo('/login');
        localStorage.removeItem('sayhi-jwt');
        AppDispatcher.dispatch({
            actionType: LoginConstants.LOGOUT_USER
        });
    }
}