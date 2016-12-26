import React from 'react';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';
import {logout} from '../../../services/authService'

export default class Account extends React.Component {

  constructor(props) {
    super(props);
    this.user = localStorage.getItem('sayhi-user')
    this.state = {
      open: false
    };
  }

  handleToggleClick(event) {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    })
  }

  handleRequestClose() {
    this.setState({
      open: false
    });
  }

  handleLogoutClick(event) {
    event.preventDefault();
    logout()
  }

  render() {
    let iconStyle = {
      padding: "0",
      width: "auto",
      height: "auto"
    }

    return (
      <div className="account-toggle">
        <div onClick={this.handleToggleClick.bind(this)}>
          Account
        </div>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
          onRequestClose={this.handleRequestClose.bind(this)}
        >
          <div className="account-toggle-name">
            {this.user}
          </div>
          <Divider />
          <Menu desktop={true} width={126}>
            <MenuItem
              className="account-menu-item"
              primaryText="Sign out"
              onClick={this.handleLogoutClick.bind(this)}
            />
          </Menu>
        </Popover>
      </div>
    )
  }
}