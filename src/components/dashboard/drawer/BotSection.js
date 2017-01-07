import React from 'react';
import Icon from '../../app/Icon'
import browserHistory from '../../../history'

export default class DashboardDrawer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <div className='' style={{width: 270, backgroundColor: '#19A5E4'}}>
          <div style={{textAlign: "left"}}>
            <div className='mt4 mb2 f6 flex justify-between items-center '>
              <Icon
                style={{width: 60, height: 60, fill: '#19A5E4'}}
                className='dim pointer pa3 ml2'
                svg={require('../../../resources/img/bot.svg')}
                onClick={() => browserHistory.push('/bots')} />
              <div className="dib tc white hf f4" style={{marginRight: 'auto'}}>{this.props.bot.name}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}