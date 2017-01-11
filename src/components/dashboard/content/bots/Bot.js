import React from 'react'
import Icon from '../../../app/Icon'
import browserHistory from '../../../../history'
import Paper from 'material-ui/Paper';
import * as DashboardActions from '../../../../actions/dashboardAction'

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

  _chooseBot = e => {
    e.preventDefault()
    browserHistory.push(this.props.bot.url)
    DashboardActions.changeBot(this.props.bot)
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


