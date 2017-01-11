import React from 'react'
import Bot from './Bot'
import AddButton from './AddButton'
import BotStore from "../../../../stores/sayhi/botStore"
import * as BotServices from "../../../../services/sayhi/botService"
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
  }

  componentWillUnmount() {
    BotStore.removeChangeListener(this._updateBotsList)
  }

  _updateBotsList = () => {
    this.setState({
      botData: BotStore.getBots()
    })
  }

  render() {
    if (this.state.botData.size === 0) {
      return (
        <div className="white f5 bf dib flex justify-center" style={{
          height: "100vh",
          alignItems: "center"
        }}>
          <Spinner spinnerName='double-bounce' />
        </div>
      )
    }

    let key = -1
    const bots = this.state.botData.map(bot => {
      key++
      return <Bot key={key} bot={bot}/>
    })
    return (
      <div>
        <div className='flex pa5 justify-left'>
          {bots}
          <AddButton/>
        </div>
      </div>
    );
  }
}


