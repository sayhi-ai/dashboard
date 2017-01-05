import React from 'react'
import Icon from '../../../app/Icon'
import BotSettings from './BotSettings'
import StateStore from "../../../../stores/stateStore"
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import Immutable from 'immutable'

export default class AddButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      boxShadow: 1
    }

    this.styles = {
      paper: {
        height: 150,
        width: 150,
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
        backgroundColor: "#19A5E4"
      }
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  _handleOpen = () => {
    this.setState({open: true});
  };

  _handleClose = () => {
    this.setState({open: false});
  };

  _hoverBot = () => {
    this.setState({
      boxShadow: 5
    })
  }

  _unhoverBot = () => {
    this.setState({
      boxShadow: 1
    })
  }

  render() {
    return (
      <div className='dib'>
        <Paper style={this.styles.paper}
               className="pointer"
               zDepth={this.state.boxShadow}
               onMouseEnter={this._hoverBot}
               onMouseLeave={this._unhoverBot}
               circle={true}>
          <div className="pt2 mt2">
            <Icon
              className="db center"
              style={{width: 120, height: 120}}
              svg={require('../../../../resources/img/add.svg')}
              onClick={this._handleOpen}/>
          </div>
        </Paper>
        <Dialog
          title="Add Bot"
          bodyStyle={{maxHeight:"none", paddingBottom: "0"}}
          actionsContainerStyle={{padding: "20px"}}
          modal={true}
          open={this.state.open}
        >
          <BotSettings
            name=""
            description=""
            chipData={Immutable.List()}
            onCancel={this._handleClose}
            onSubmit={this._handleClose}/>
        </Dialog>
      </div>
    );
  }
}


