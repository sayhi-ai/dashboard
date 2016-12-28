import React from 'react';
import SendEmail from './SendEmail'
import UpdatePassword from './UpdatePassword';
import AccountStore from '../../../stores/accountStore'

export default class ResetPassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }

  componentDidMount() {
    AccountStore.addChangeListener(this._handleViewSwitch.bind(this))
  }

  componentWillUnmount() {
    AccountStore.removeChangeListener(this._handleViewSwitch.bind(this))
  }

  _handleViewSwitch() {
    const email = AccountStore.getResetEmail();
    console.log(email)

    if (email !== null && email !== '') {
      this.setState({
        email: email
      });
    }
  }

  render() {
    if (this.state.email === '') {
      return (
        <div>
          <SendEmail/>
        </div>
      )
    }

    return (
      <div>
        <UpdatePassword email={this.state.email}/>
      </div>
    )
  }
}