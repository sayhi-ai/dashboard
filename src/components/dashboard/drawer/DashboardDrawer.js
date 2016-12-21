import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import {changePhrase} from "../../../actions/stateAction"
import {addPhrase, fetchPhrases} from "../../../services/sayhi/phraseService"
import PhraseStore from "../../../stores/sayhi/phraseStore"
import StateStore from "../../../stores/stateStore"
import ENV_VARS from '../../../../tools/ENV_VARS'

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
            phrases: [],
        }
    }

    componentDidMount() {
        PhraseStore.addChangeListener(this._loadPhraseList.bind(this))
    }

    componentWillUnmount() {
        PhraseStore.removeChangeListener(this._loadPhraseList.bind(this))
    }
    
    _loadPhraseList() {
        this.phrasesObj = PhraseStore.getPhrases()
        const phrases = this.phrasesObj.map(phrase => phrase.phrase)

        if (phrases.length === 0) {
            return;
        }

        let phraseDivs =  phrases
            .map((phrase, index) => {
                return (
                    <div
                        className='pointer pv2 ph3 f5 dim'
                        style={{background: '#fafafa'}}
                        key={index}
                        onClick={(e) => this._handlePhraseSelectFieldChange(e, index)}
                    >
                        "{phrase}"
                    </div>
                )
            })

        // TODO: fix this hack
        if (this.phrasesObj.size > 0 && this.firstLoad) {
            this.firstLoad = false
            setTimeout(() => changePhrase(this.phrasesObj.get(0)), 0);
        }
        this.setState({
            phrases: phraseDivs,
            phraseValue: 0
        })
    }

    _handlePhraseSelectFieldChange = (event, index) => {
        changePhrase(this.phrasesObj.get(index))
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
        if(event.key == 'Enter'){
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
                    <div style={{textAlign:"left"}}>
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
                        {this.state.phrases}
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
                               placeholder="Phrase" />
                </Dialog>
            </div>
        )
    }
}