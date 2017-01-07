import React from 'react'
import Icon from '../../../app/Icon'
import * as DashboardActions from '../../../../actions/dashboardAction'
import DashboardStore from "../../../../stores/dashboardStore"
import browserHistory from '../../../../history'
import ENV_VARS from '../../../../../tools/ENV_VARS'
import Paper from 'material-ui/Paper';

export default class Bot extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      boxShadow: 2
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  _hoverBot = () => {
    this.setState({
      boxShadow: 4
    })
  }

  _unhoverBot = () => {
    this.setState({
      boxShadow: 2
    })
  }

  _chooseBot = (e) => {
    DashboardActions.changeBot(this.props.bot)
    browserHistory.push()
  }

  render() {
    const style = {
      height: 150,
      width: 150,
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
    };

    return (
      <div className='dib'>
        <Paper style={style}
               className="pointer"
               zDepth={this.state.boxShadow}
               onMouseEnter={this._hoverBot}
               onMouseLeave={this._unhoverBot}
               onClick={this._chooseBot}
               circle={false}>
          <div className="pt2 mt2">
            <img
              className="db center"
              style={{width: 80, height: 80}}
              src={require('../../../../resources/img/bot-icon.jpg')}
            />
          </div>
          <div className="btf hf f5 pt2">{this.props.bot.name}</div>
        </Paper>
      </div>
    );
  }
}


