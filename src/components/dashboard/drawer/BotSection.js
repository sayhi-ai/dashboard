import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import Icon from '../../app/Icon'
import Avatar from 'material-ui/Avatar'
import ListItem from 'material-ui/List/ListItem';
import {changePhrase} from "../../../actions/dashboardAction"
import {addPhrase, removePhrase, fetchPhrases} from "../../../services/sayhi/phraseService"
import PhraseStore from "../../../stores/sayhi/phraseStore"
import StateStore from "../../../stores/stateStore"
import ENV_VARS from '../../../../tools/ENV_VARS'
import Immutable from 'immutable'

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
              />
              <div className="dib tc white hf f4" style={{marginRight: 'auto'}}>Bot</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}