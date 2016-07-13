import React from "react"
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiTheme from './MuiTheme';
import LoginStore from '../../stores/loginStore';
import AuthService from '../../services/authService'

export default class App extends React.Component {
    constructor() {
        super()
        this.state = this._getLoginState();

        injectTapEventPlugin()
    }

    _getLoginState() {
        return {
            userLoggedIn: LoginStore.isLoggedIn()
        };
    }

    componentDidMount() {
        this.changeListener = this._onChange.bind(this);
        LoginStore.addChangeListener(this.changeListener);
    }

    _onChange() {
        this.setState(this._getLoginState());
    }

    componentWillUnmount() {
        LoginStore.removeChangeListener(this.changeListener);
    }

    logout(e) {
        e.preventDefault();
        AuthService.logout();
    }

    render() {
        return (
            <MuiTheme>
                {this.props.children}
            </MuiTheme>
        )
    }
}