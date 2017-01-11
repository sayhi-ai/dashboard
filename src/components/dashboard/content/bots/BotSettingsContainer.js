import React from 'react'
import Divider from 'material-ui/Divider';
import BotSettings from "./BotSettings"
import BotStore from "../../../../stores/sayhi/botStore"
import * as BotServices from "../../../../services/sayhi/botService"
import * as DashboardActions from '../../../../actions/dashboardAction'
import DashboardStore from "../../../../stores/dashboardStore"
import Spinner from 'react-spinkit'

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

    DashboardStore.addChangeListener(this._updateBot) // registering here so that _updateBot is called even when not mounted yet
  }

  componentDidMount() {
    this._loadBotInit()
  }

  componentWillUnmount() {
    DashboardStore.removeChangeListener(this._updateBot)
  }

  _updateBot = () => {
    const bot = DashboardStore.getCurrentBot()
    this.setState({
      bot: bot
    })
  }

  _loadBotInit = () => {
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
          }
        })
    }

    const bot = BotStore.getBots().find(bot => bot.name === botName)
    DashboardActions.changeBot(bot)
  }

  render() {
    if (this.state.bot.name === "") {
      return (
        <div className="white f5 bf dib flex justify-center" style={{
          height: "100vh",
          alignItems: "center"
        }}>
          <Spinner spinnerName='double-bounce' />
        </div>
      )
    }

    return (
      <div>
        <div className="hf f1 pa4 btc" style={{background: "white"}}>Bot:{this.state.bot.name}</div>
        <Divider/>
        <div className='flex pa5 justify-left'>
          <BotSettings bot={this.state.bot}/>
        </div>
      </div>
    )
  }
}


