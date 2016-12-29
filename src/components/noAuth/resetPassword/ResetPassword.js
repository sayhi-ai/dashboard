import React from 'react';
import SendEmail from './SendEmail'
import UpdatePassword from './UpdatePassword';
import AccountStore from '../../../stores/accountStore'
import {sendPasswordResetCode} from '../../../services/accountService'

export default class ResetPassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      success: false
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

    if (email !== null && email !== '' && email !== this.state.email) {
      sendPasswordResetCode(email)
        .then(response => {
          if (response) {
            this.setState({
              success: true
            });
          }
        })
      this.setState({
        email: email
      });
    }
  }

  render() {
    if (this.state.success) {
      return (
        <div>
          <UpdatePassword email={this.state.email}/>
        </div>
      )
    }

    return (
      <div>
        <SendEmail/>
      </div>
    )
  }
}