import request from 'reqwest';
import when from 'when';
import LoginConstants from '../constants/loginConstants.js';
import LoginActions from '../actions/loginActions';

export default class AuthService {
    login(email, password) {
        return this.handleAuth(when(request({
            url: LoginConstants.LOGIN_URL,
            method: 'POST',
            crossOrigin: true,
            type: 'json',
            data: {
                email, password
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