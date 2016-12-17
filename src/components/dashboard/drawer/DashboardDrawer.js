import React from 'react';
import Drawer from 'material-ui/Drawer';
import SelectField from 'material-ui/SelectField';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider';
import {initSearch, changePhrase} from "../../../actions/searchAction"
import {distributeData} from "../../../actions/sayhiAction"
import logoTitleImage from "../../../resources/img/logowithtext.png"
import SearchStore from "../../../stores/searchStore"
var Immutable = require('immutable');
var sayhi = require('sayhi-ai');

export default class DashboardDrawer extends React.Component {
    
    constructor(props) {
        super(props)
        
        this.state = {
            dialogOpen: false,
            addPhrase: '',
            addPhraseErrorCode: '',
            addResponse: '',
            addResponseErrorCode: '',
            phraseValue: 0,
            phrases: [],
        }
    }

    componentDidMount() {
        SearchStore.addChangeListener(this._initSearch.bind(this))
    }

    componentWillUnmount() {
        SearchStore.removeChangeListener(this._initSearch.bind(this))
    }
    
    _initPhraseList(phraseList) {
        this.phrasesText = Immutable.List(phraseList)

        return Immutable.List(this.phrasesText.map((phrase, index) => {
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
        }))
    }

    _initSearch() {
        let phrases = SearchStore.getAllPhrases()
        
        if (phrases.length > 0) {
            this.setState({
                phrases: this._initPhraseList(phrases)
            })
            
            //changePhrase(phrases[0])
        }
    }

    _handlePhraseSelectFieldChange = (event, index) => {
        changePhrase(this.phrasesText.get(index))
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

    _handleResponseTextFieldChange(e) {
        this.setState({
            addResponse: e.target.value
        })
    }
    
    _handleAddResponseTuple(e) {
        let phrase = this.state.addPhrase
        let response = this.state.addResponse
        
        let error = false
        let phraseErrorMessage = ""
        let responseErrorMessage = ""
        
        if (phrase === "" || phrase.length > 30) {
            error = true
            phraseErrorMessage = "A phrase is between 0 and 30 characters long."
        }

        if (phrase === "" || response.length > 30) {
            error = true
            responseErrorMessage = "A response is between 0 and 200 characters long."
        }
        
        if (error) {
            this.setState({
                addPhraseErrorCode: phraseErrorMessage,
                addResponseErrorCode: responseErrorMessage
            })
        } else {
            sayhi.addResponse({
                phrase: phrase,
                text: response
            }, this._addResponse.bind(this))
            
            this.setState({
                addPhraseErrorCode: '',
                addResponseErrorCode: '',
                dialogOpen: false
            })
        }
    }
    
    _addResponse(data) {
        initSearch(data.phrases.map(phrase => phrase.name))
        distributeData(data.responses)
    }

    _handleKeyPress(event) {
        if(event.key == 'Enter'){
            this._handleAddResponseTuple(event)
        }
    }

    render() {
        const actions = [
            <RaisedButton
                label="Add"
                primary={true}
                onTouchTap={this._handleAddResponseTuple.bind(this)}
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
                    title="Add a phrase & response"
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
                    <TextField type="text"
                               value={this.state.addResponse}
                               inputStyle={{textAlign: "center"}}
                               style={{width: "100%"}}
                               errorText={this.state.addResponseErrorCode}
                               onChange={this._handleResponseTextFieldChange.bind(this)}
                               id="addResponseTextField"
                               onKeyPress={this._handleKeyPress.bind(this)}
                               placeholder="Response" />
                </Dialog>
            </div>
        )
    }
}