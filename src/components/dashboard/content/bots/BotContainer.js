import React from 'react'
import Bot from './Bot'
import AddButton from './AddButton'
import StateStore from "../../../../stores/dashboardStore"
import BotStore from "../../../../stores/sayhi/botStore"
import * as BotServices from "../../../../services/sayhi/botService"
import ENV_VARS from '../../../../../tools/ENV_VARS'
import Spinner from 'react-spinkit'
import Immutable from 'immutable'

export default class BotContainer extends React.Component {

  constructor(props) {
    super(props);

    BotServices.fetchBots()

    this.state = {
      botData: Immutable.List()
    }
  }

  componentDidMount() {
    BotStore.addChangeListener(this._updateBotsList)
    StateStore.addChangeListener(this._updateCurrentBot)
  }

  componentWillUnmount() {
    BotStore.removeChangeListener(this._updateBotsList)
    StateStore.removeChangeListener(this._updateCurrentBot)
  }

  _updateCurrentBot = () => {

  }

  _updateBotsList = () => {
    this.setState({
      botData: BotStore.getBots()
    })
  }

  render() {
    let key = -1
    const bots = this.state.botData.map(bot => {
      key++
      return <Bot key={key} bot={bot}/>
    })
    return (
      <div className='flex pa5 justify-left'>
        {bots}
        <AddButton/>
      </div>
    );
  }
}


