import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import {changePhrase} from "../../../actions/dashboardAction"
import {addPhrase, removePhrase, fetchPhrases} from "../../../services/sayhi/phraseService"
import PhraseStore from "../../../stores/sayhi/phraseStore"
import StateStore from "../../../stores/stateStore"
import ENV_VARS from '../../../../tools/ENV_VARS'
import Immutable from 'immutable'

export default class DashboardDrawer extends React.Component {

  constructor(props) {
    super(props)

    fetchPhrases(StateStore.getCurrentBotId())
    this.firstLoad = true

    this.state = {
      dialogOpen: false,
      addPhrase: '',
      addPhraseErrorCode: '',
      phraseValue: 0,
      phrases: new Immutable.List(),
    }
  }

  componentDidMount() {
    PhraseStore.addChangeListener(this._loadPhraseList.bind(this))
  }

  componentWillUnmount() {
    PhraseStore.removeChangeListener(this._loadPhraseList.bind(this))
  }

  _loadPhraseList() {
    if (PhraseStore.getPhrases().size === 0) {
      return;
    }

    // TODO: fix this hack
    if (PhraseStore.getPhrases().size > 0 && this.firstLoad) {
      this.firstLoad = false
      setTimeout(() => changePhrase(PhraseStore.getPhrases().get(0)), 0);
    }

    this.setState({
      phrases: PhraseStore.getPhrases(),
    })
  }

  _handlePhraseSelectFieldChange = (event, index) => {
    changePhrase(this.state.phrases.get(index))
    this.setState({phraseValue: index});
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

    let phrases = PhraseStore.getPhrases().filter(p => p.phrase === phrase)
    if (phrases.size !== 0) {
      error = true
      phraseErrorMessage = "Phrase already exists."
    }

    if (phrase === "" || phrase.length > 30) {
      error = true
      phraseErrorMessage = "A phrase is between 0 and " +
        ENV_VARS.CONSTANTS.MAX_PHRASE_TOKEN_LENGTH + " characters long."
    }

    if (error) {
      this.setState({
        addPhraseErrorCode: phraseErrorMessage,
      })
    } else {
      addPhrase(StateStore.getCurrentBotId(), phrase)
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
    const actions = [
      <RaisedButton
        label="Add"
        primary={true}
        onTouchTap={this._handleAddPhrase.bind(this)}
      />
    ];

    return (
      <div style={{background: '#f0f0f0'}}>
        <div className='' style={{width: 270}}>
          <div style={{textAlign: "left"}}>
            <div className='ttu mt4 mb2 f6 flex justify-between items-center ph3'>
              <div>
                Phrases
              </div>
              <div
                className='flex items-center pointer dim' style={{fontSize: '.7rem'}}
                onClick={this._handleDialogOpen.bind(this)}
              >
                <div
                  style={{width: 16, height: 16, paddingBottom: 2}}
                  className='br-100 ba flex items-center justify-center'
                >
                  +
                </div>
                <div className='ml1'>
                  Add
                </div>
              </div>
            </div>
            {this.state.phrases.map((phrase, index) =>
              <div
                className='pointer pv2 ph3 f5 flex justify-between items-center hide-child'
                style={{background: this.state.phraseValue !== index ? '#fafafa' : '#e0e0e0'}}
                key={index}
                onClick={(e) => this._handlePhraseSelectFieldChange(e, index)}
              >
                <div>
                  "{phrase.phrase}"
                </div>
                {this.state.phrases.size > 1 &&
                <div className='ttu mr2 red child' style={{fontSize: '.7em'}} onClick={() => removePhrase(phrase.id)}>
                  delete
                </div>
                }
              </div>
            )}
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