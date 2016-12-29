import React from 'react';
import Paper from "material-ui/Paper"
import ErrorStore from "../../stores/errorStore"
import NoAuthStore from "../../stores/noAuthStore"
import logoTitleImage from "../../resources/img/logowithtext.png"
import Snackbar from "material-ui/Snackbar"
import {Link} from "react-router"

export default class NoAuthContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      snackBarColor: '',
      snackBarText: ''
    };
  }

  componentDidMount() {
    ErrorStore.addChangeListener(this._handleError.bind(this))
    NoAuthStore.addChangeListener(this._handleMessage.bind(this))
  }

  componentWillUnmount() {
    ErrorStore.removeChangeListener(this._handleError.bind(this))
    NoAuthStore.addChangeListener(this._handleMessage.bind(this))
  }

  _handleError() {
    const error = ErrorStore.getNoAuthError();
    if (error !== null) {
      this.setState({
        open: true,
        snackBarColor: "#F44336",
        snackBarText: error
      })
    }
  }

  _handleMessage() {
    const message = NoAuthStore.getMessage();
    const color = NoAuthStore.getColor();

    if (message !== null) {
      this.setState({
        open: true,
        snackBarColor: color,
        snackBarText: message
      })
    }
  }

  _handleSnackBarClose() {
    this.props.onRequestClose; // Default closing behaviour (i.e. animation)
    this.setState({
      open: false,
    });
  }

  _handleKeyPress(event) {
    this._handleSnackBarClose();
  }

  render() {
    return (
      <div className="login-screen">
        <div className="login-outer">
          <div className="login-inner">
            <Paper className="login-div" zDepth={5}
                   onKeyPress={this._handleKeyPress.bind(this)}>
              <Link to="/login"><img className="login-logo" src={logoTitleImage}/></Link>
              {this.props.children}
            </Paper>
          </div>
        </div>
        <Snackbar message={this.state.snackBarText}
                  bodyStyle={{
                    backgroundColor: this.state.snackBarColor, fontFamily: "Header-Font",
                    textAlign: "center"
                  }}
                  onRequestClose={this._handleSnackBarClose.bind(this)}
                  autoHideDuration={8000}
                  open={this.state.open}/>
      </div>
    );
  }
}