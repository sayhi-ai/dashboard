import React from 'react';
import LoginStore from '../../stores/loginStore';
import { browserHistory } from 'react-router'

export default (ComposedComponent) => {
    return class AuthenticatedComponent extends React.Component {

        constructor() {
            super()
            this.state = this._getLoginState();
        }

        _getLoginState() {
            return {
                userLoggedIn: LoginStore.isLoggedIn(),
                user: LoginStore.getUser(),
                jwt: LoginStore.getJwt()
            };
        }

        componentDidMount() {
            LoginStore.addChangeListener(this._onChange.bind(this));
        }

        componentWillUnmount() {
            LoginStore.removeChangeListener(this._onChange.bind(this));
        }

        _onChange() {
            this.setState(this._getLoginState());
        }

        render() {
            if (!this.state.userLoggedIn) {
                browserHistory.push('/login')
            }

            return (
                <ComposedComponent
                    {...this.props}
                    user={this.state.user}
                    jwt={this.state.jwt}
                    userLoggedIn={this.state.userLoggedIn}/>
            );
        }
    }
};