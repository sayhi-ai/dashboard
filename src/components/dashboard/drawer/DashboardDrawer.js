import React from 'react';
import BotSection from './BotSection'
import PhraseSection from './PhraseSection'

export default class DashboardDrawer extends React.Component {

  render() {
    const props = Object.assign({}, this.props)

    return (
      <div style={{background: '#19A5E4'}}>
        <BotSection {...props}/>
        <PhraseSection {...props}/>
      </div>
    )
  }
}