import React from 'react';
import AuthenticatedComponent from '../app/AuthenticatedComponent';
import Account from "./account/Account"
import HeaderBar from "./headerBar/HeaderBar"
import DashboardDrawer from "./drawer/DashboardDrawer"
import Content from "./content/Content"
import Snackbar from "material-ui/Snackbar"
import ErrorStore from "../../stores/errorStore"

export default AuthenticatedComponent(class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      snackBarColor: '',
      snackBarText: ''
    };
  }

  componentDidMount() {
    ErrorStore.addChangeListener(this._handleErrorMessage.bind(this))
  }

  componentWillUnmount() {
    ErrorStore.removeChangeListener(this._handleErrorMessage.bind(this))
  }

  _handleErrorMessage() {
    let error = ErrorStore.getDashboardError()
    if (error !== null) {
      this._openErrorMessage(error)
    } else {
      this._closeErrorMessage()
    }
  }

  _openErrorMessage(error) {
    this.setState({
      open: true,
      snackBarColor: "#F44336",
      snackBarText: error
    })

    setTimeout(() => this._closeErrorMessage(), 2000);
  }

  _closeErrorMessage() {
    this.setState({
      open: false
    })
  }

  render() {
    const props = Object.assign({}, this.props)
    return (
      <div className="flex flex-column min-vh-100">
        <div className='flex w-100 flex-auto'>
          <DashboardDrawer {...props}/>
          <div className='flex-auto' style={{background: "#FAFAFA"}}>
            <Content {...props}/>
          </div>
        </div>
        <Snackbar message={this.state.snackBarText}
          bodyStyle={{
            backgroundColor: this.state.snackBarColor, fontFamily: "Header-Font",
            textAlign: "center"
          }}
          open={this.state.open}/>
      </div>
    );
  }
})