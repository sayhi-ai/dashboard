import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import PhraseStore from "../../../stores/sayhi/phraseStore"
import StateStore from "../../../stores/dashboardStore"
import ENV_VARS from '../../../../tools/ENV_VARS'
import Immutable from 'immutable'
import browserHistory from '../../../history'
import Spinner from 'react-spinkit'
import DashboardStore from "../../../stores/dashboardStore"
import BotStore from "../../../stores/sayhi/botStore"
import * as BotServices from "../../../services/sayhi/botService"
import * as PhraseServices from "../../../services/sayhi/phraseService"
import * as DashboardActions from '../../../actions/dashboardAction'

export default class DashboardDrawer extends React.Component {

  constructor(props) {
    super(props)

    this.currentBot = null

    this.state = {
      dialogOpen: false,
      addPhrase: '',
      addPhraseErrorCode: '',
      phraseValue: -1,
      phrases: this.props.phrases,
    }

    this.onResponeRouteLeave()
  }

  onResponeRouteLeave() {
    browserHistory.listen(location =>  {
      if (!/^bot\/.+\/phrase\/.+$/.test(location.pathname) && this.state.phraseValue !== -1) {
        this.setState({
          phraseValue: -1
        })
      }
    })
  }

  componentDidMount() {
    PhraseStore.addChangeListener(this._loadPhraseList)
  }

  componentWillUnmount() {
    PhraseStore.removeChangeListener(this._loadPhraseList)
  }

  _loadPhraseList = () => {
    let index = -1
    const phrases = PhraseStore.getPhrases()
    if (this.props.params.phrase !== undefined) {
      const phrase = phrases.find(phrase => phrase.phrase === this.props.params.phrase)
      index = phrases.indexOf(phrase)
    }

    this.setState({
      phrases: phrases,
      phraseValue: index
    })
  }

  _handlePhraseSelectFieldChange = (event, index) => {
    const phrase = this.state.phrases.get(index)
    browserHistory.push(phrase.url)
    this.setState({phraseValue: index})
    DashboardActions.changePhrase(phrase)
  }

  _handleDialogOpen() {
    this.setState({dialogOpen: true})
  }

  _handleDialogClose() {
    this.setState({dialogOpen: false})
  }

  _handlePhraseTextFieldChange(e) {
    this.setState({
      addPhrase: e.target.value
    })
  }

  _handleAddPhrase(e) {
    let phrase = this.state.addPhrase

    let error = false
    let phraseErrorMessage = ""

    let phrases = PhraseStore.getPhrases().filter(p => p.phrase.toLowerCase() === phrase.toLowerCase())
    if (phrases.size !== 0) {
      error = true
      phraseErrorMessage = "Phrase already exists."
    }

    if (phrase === "" || phrase.length > 30) {
      error = true
      phraseErrorMessage = "A phrase is between 0 and " + ENV_VARS.CONSTANTS.MAX_PHRASE_TOKEN_LENGTH + " characters long."
    }

    if (error) {
      this.setState({
        addPhraseErrorCode: phraseErrorMessage,
      })
    } else {
      PhraseServices.addPhrase(StateStore.getCurrentBotId(), phrase)
      this.setState({
        addPhraseErrorCode: '',
        dialogOpen: false,
        addPhrase: ''
      })
    }
  }

  _handleKeyPress(event) {
    if (event.key == 'Enter') {
      this._handleAddPhrase(event)
    }
  }

  render() {
    let phraseDivs = this.state.phrases.map((phrase, index) =>
      <div
        className='pointer pv2 ph3 f5 flex justify-between items-center hide-child white'
        style={{background: this.state.phraseValue !== index ? '#19A5E4' : '#0288D1'}}
        key={index}
        onClick={(e) => this._handlePhraseSelectFieldChange(e, index)}
      >
        <div>
          "{phrase.phrase}"
        </div>
        {this.state.phrases.size > 1 &&
        <div className='ttu mr2 red child' style={{fontSize: '.7em'}} onClick={() => PhraseServices.removePhrase(phrase.id)}>
          delete
        </div>
        }
      </div>
    )

    if (this.state.phrases.size === 0) {
      phraseDivs = (
        <div className="white f5 bf dib flex justify-center" style={{
          alignItems: "center"
        }}>
          <Spinner spinnerName='wave' />
        </div>
      )
    }

    const actions = [
      <RaisedButton
        label="Add"
        primary={true}
        onTouchTap={this._handleAddPhrase.bind(this)}
      />
    ];

    return (
      <div>
        <div className='' style={{width: 270}}>
          <div style={{textAlign: "left"}}>
            <div className='ttu mt4 mb2 f6 flex justify-between white items-center ph3'>
              <div>
                Phrases
              </div>
              <div
                className='flex items-center pointer dim' style={{fontSize: '.7rem'}}
                onClick={this._handleDialogOpen.bind(this)}
              >
                <div
                  style={{width: 20, height: 20, paddingBottom: 2}}
                  className='br-100 ba flex items-center justify-center f4'
                >
                  +
                </div>
              </div>
            </div>
            {phraseDivs}
          </div>
        </div>
        <Dialog
          title="Add a phrase"
          actions={actions}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this._handleDialogClose.bind(this)}
        >
          <TextField type="text"
                     value={this.state.addPhrase}
                     inputStyle={{textAlign: "center"}}
                     style={{width: "100%"}}
                     errorText={this.state.addPhraseErrorCode}
                     onChange={this._handlePhraseTextFieldChange.bind(this)}
                     id="addPhraseTextField"
                     onKeyPress={this._handleKeyPress.bind(this)}
                     placeholder="Phrase"/>
        </Dialog>
      </div>
    )
  }
}