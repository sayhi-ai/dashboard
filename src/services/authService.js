import request from 'reqwest';
import when from 'when';
import {LOGIN_URL, SIGNUP_URL} from '../constants/loginConstants';
import LoginActions from '../actions/loginActions';

export default class AuthService {
    login(username, password) {
        return this.handleAuth(when(request({
            url: LOGIN_URL,
            method: 'POST',
            crossOrigin: true,
            type: 'json',
            data: {
                username, password
            }
        })));
    }

    logout() {
        LoginActions.logoutUser();
    }

    handleAuth(loginPromise) {
        return loginPromise
            .then(function(response) {
                var jwt = response.id_token;
                LoginActions.loginUser(jwt);
                return true;
            });
    }
}