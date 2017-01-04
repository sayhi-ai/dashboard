import React from 'react';
import BotSection from './BotSection'
import PhraseSection from './PhraseSection'

export default class DashboardDrawer extends React.Component {

  render() {
    return (
      <div style={{background: '#f0f0f0'}}>
        <BotSection/>
        <PhraseSection/>
      </div>
    )
  }
}