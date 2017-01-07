import React from 'react'
import DashboardStore from "../../../../stores/dashboardStore"
import Divider from 'material-ui/Divider';
import BotSettings from "./BotSettings"
import BotStore from "../../../../stores/sayhi/botStore"
import * as BotServices from "../../../../services/sayhi/botService"
import * as DashboardActions from '../../../../actions/dashboardAction'

export default class BotSettingsContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      bot: {
        name: "",
        description: "",
        tags: []
      }
    }
  }

  _loadCurrentBot = () => {
    if (this.props.params.bot === undefined || this.state.bot.name === this.props.params.bot) {
      return this.state.bot
    }

    const botName = this.props.params.bot
    const bots = BotStore.getBots()
    if (bots.size === 0) {
      return BotServices.fetchBots()
        .then(response => BotStore.getBots().find(bot => bot.name === botName)  )
        .then(bot => {
          if (bot !== null) {
            DashboardActions.changeBot(bot)
            this.setState({
              bot: bot
            })
            return true
          }
          return false
        })
    }

    const bot = BotStore.getBots().find(bot => bot.name === botName)
    DashboardActions.changeBot(bot)
    return bot
  }

  render() {
    const bot = this._loadCurrentBot()
    let trueBot = this.state.bot
    if (bot.name !== undefined) {
      trueBot = bot
    }

    return (
      <div>
        <div className="hf f1 pa4 btc" style={{background: "white"}}>Bot:{trueBot.name}</div>
        <Divider/>
        <div className='flex pa5 justify-left'>
          <BotSettings bot={trueBot}/>
        </div>
      </div>
    )
  }
}


