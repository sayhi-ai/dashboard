import React from 'react';
import BotSection from './BotSection'
import PhraseSection from './PhraseSection'
import DashboardStore from "../../../stores/dashboardStore"
import Immutable from 'immutable'
import browserHistory from '../../../history'
import BotStore from "../../../stores/sayhi/botStore"
import PhraseStore from "../../../stores/sayhi/phraseStore"
import * as BotServices from "../../../services/sayhi/botService"
import * as PhraseServices from "../../../services/sayhi/phraseService"
import * as ResponseServices from "../../../services/sayhi/responseService"
import * as DashboardActions from '../../../actions/dashboardAction'

export default class DashboardDrawer extends React.Component {
  constructor(props) {
    super(props)

    this.firstLoad = false
    this.firstLoadCheck = true // SOOOO bad I know
    this.onResponeRouteEnter()

    this.state = {
      currentBot: null
    }
  }

  onResponeRouteEnter() {
    browserHistory.listen(location =>  {
      if (/^bot\/.+\/phrase\/.+$/.test(location.pathname)) {
        if (this.firstLoadCheck) {
          this.firstLoad = true
        }
        this.firstLoadCheck = false
        this._loadResponsesInit()
      }
    })
  }

  componentDidMount() {
    DashboardStore.addChangeListener(this._updateCurrentBot)
  }

  componentWillUnmount() {
    DashboardStore.removeChangeListener(this._updateCurrentBot)
  }

  _loadResponsesInit = () => {
    const botName = this.props.params.bot
    const phraseName = this.props.params.phrase

    if (this.firstLoad) {
      BotServices.fetchBots()
        .then(response => BotStore.getBots().find(bot => bot.name === botName))
        .then(bot => {
          DashboardActions.changeBot(bot)
          return bot
        })
        .then(bot => PhraseServices.fetchPhrases(bot.id))
        .then(nothing => PhraseStore.getPhrases().find(phrase => phrase.phrase === phraseName))
        .then(phrase => {
          DashboardActions.changePhrase(phrase)
          return phrase
        })
        .then(phrase => ResponseServices.fetchResponses(phrase.id))
        .then(result => this.firstLoad = false)
        .catch(error => console.log(error))
    }
  }

  _updateCurrentBot = () => {
    const bot = DashboardStore.getCurrentBot()

    if (bot !== null && (this.state.currentBot === null || bot.name !== this.state.currentBot.name)) {
      if (!this.firstLoad) {
        PhraseServices.fetchPhrases(bot.id)
      }
      setTimeout(() => this.setState({
        currentBot: bot
      }),  0)
    }
  }

  render() {
    if (this.state.currentBot === null) {
      return (
        <div className="white f5 bf dib flex justify-center" style={{
          background: '#19A5E4',
          width: 270,
          alignItems: "center"
        }}>
          Choose a bot.
        </div>
      )
    }

    const props = Object.assign({}, this.props)
    return (
      <div style={{background: '#19A5E4'}}>
        <BotSection {...props} bot={this.state.currentBot}/>
        <PhraseSection {...props} phrases={Immutable.List()}/>
      </div>
    )
  }
}