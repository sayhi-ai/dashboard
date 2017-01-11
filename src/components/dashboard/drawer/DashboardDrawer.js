import React from 'react';
import BotSection from './BotSection'
import PhraseSection from './PhraseSection'
import DashboardStore from "../../../stores/dashboardStore"
import Immutable from 'immutable'
import * as PhraseServices from "../../../services/sayhi/phraseService"

export default class DashboardDrawer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentBot: null
    }
  }

  componentDidMount() {
    DashboardStore.addChangeListener(this._updateCurrentBot)
  }

  componentWillUnmount() {
    DashboardStore.removeChangeListener(this._updateCurrentBot)
  }

  _updateCurrentBot = () => {
    const bot = DashboardStore.getCurrentBot()

    if (bot !== null) {
      PhraseServices.fetchPhrases(bot.id)
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