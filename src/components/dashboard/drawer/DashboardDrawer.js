import React from 'react';
import BotSection from './BotSection'
import PhraseSection from './PhraseSection'
import DashboardStore from "../../../stores/dashboardStore"

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
      this.setState({
        currentBot: bot
      })
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
        <PhraseSection {...props}/>
      </div>
    )
  }
}