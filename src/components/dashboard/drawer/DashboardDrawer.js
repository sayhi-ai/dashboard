import React from 'react';
import Drawer from 'material-ui/Drawer';
import SelectField from 'material-ui/SelectField';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider';
import {changePhrase, changePersona} from "../../../actions/searchAction"
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
            addPersona: '',
            addPersonaErrorCode: '',
            addResponse: '',
            addResponseErrorCode: '',
            phraseValue: 1,
            personaValue: 1,
            phrases: [],
            personas: []
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
        this.phrasesText = this.phrasesText.push("Add a phrase...")
        
        let i = 0 // Start at 0 because we add first
        return Immutable.List(this.phrasesText.map(phrase => {
            i++
            if (i === this.phrasesText.size) {
                return (
                    <span>
                        <Divider/>
                        <MenuItem value={i} primaryText={phrase}/>
                    </span>
                )
            } else {
                return <MenuItem value={i} primaryText={phrase}/>
            }
        }))
    }
    
    _initPersonaList(personaList) {
        this.personaText = Immutable.List(personaList)
        this.personaText = this.personaText.push("Add a persona...")

        let j = 0 // Start at 0 because we add first
        return Immutable.List(this.personaText.map(persona => {
            j++
            if (j === this.personaText.size) {
                return (
                    <span>
                        <Divider/>
                        <MenuItem value={j} primaryText={persona} />
                    </span>
                )
            } else {
                return <MenuItem value={j} primaryText={persona} />
            }
        }))
    }

    _initSearch() {
        let phrases = SearchStore.getAllPhrases()
        let personas = SearchStore.getAllPersonas()
        
        if (phrases.length > 0) {
            this.setState({
                phrases: this._initPhraseList(phrases)
            })
            
            //changePhrase(phrases[0])
        }
        
        if (personas.length > 0) {
            this.setState({
                personas: this._initPersonaList(personas)
            })

            //changePersona(personas[0])
        }
    }

    _handlePhraseSelectFieldChange = (event, index, value) => {
        if (!value) {
            this._handleDialogOpen() // This occurs when the user has clicked on add a phrase
        } else {
            console.log(this.phrasesText, value - 1)
            changePhrase(this.phrasesText.get(value - 1))
            this.setState({phraseValue: value});
        }
    }
    
    _handlePersonaSelectFieldChange = (event, index, value) => {
        if (!value) {
            this._handleDialogOpen() // This occurs when the user has clicked on add a persona
        } else {
            console.log(this.phrasesText, value - 1)
            changePersona(this.personaText.get(value - 1))
            this.setState({personaValue: value})
        }
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

    _handlePersonaTextFieldChange(e) {
        this.setState({
            addPersona: e.target.value
        })
    }

    _handleResponseTextFieldChange(e) {
        this.setState({
            addResponse: e.target.value
        })
    }
    
    _handleAddResponseTuple(e) {
        let phrase = this.state.addPhrase
        let persona = this.state.addPersona
        let response = this.state.addResponse
        
        let error = false
        let phraseErrorMessage = ""
        let personaErrorMessage = ""
        let responseErrorMessage = ""
        
        if (phrase === "" || phrase.length > 30) {
            error = true
            phraseErrorMessage = "A phrase is between 0 and 30 characters long."
        }

        if (persona === "" || persona.length > 30) {
            error = true
            personaErrorMessage = "A persona is between 0 and 30 characters long."
        }

        if (phrase === "" || response.length > 30) {
            error = true
            responseErrorMessage = "A response is between 0 and 200 characters long."
        }
        
        if (error) {
            this.setState({
                addPhraseErrorCode: phraseErrorMessage,
                addPersonaErrorCode: personaErrorMessage,
                addResponseErrorCode: responseErrorMessage
            })
        } else {
            sayhi.addResponse({
                phrase: phrase,
                persona: persona,
                text: response
            }, this._addResponse.bind(this, phrase, persona))
            
            this.setState({
                addPhraseErrorCode: '',
                addPersonaErrorCode: '',
                addResponseErrorCode: '',
                dialogOpen: false
            })
        }
    }
    
    _addResponse(phrase, persona, data) {
        distributeData(data.responses)
        this.phrasesText = this.phrasesText.push(phrase)
        this.personaText = this.personaText.push(persona)
        this.setState({
            phrases: this._initPhraseList(this.phrasesText),
            personas: this._initPersonaList(this.personaText)
        })
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
            <div>
                <Drawer open={true} className="dashboard-drawer">
                    <img className="dashboard-logo" src={logoTitleImage}/>
                    <h3 className="dashboard-drawer-search-title">Search for a response</h3>
                    <div style={{textAlign:"left", marginLeft:"30px"}}>
                        <SelectField value={this.state.phraseValue}
                                     onChange={this._handlePhraseSelectFieldChange.bind(this)}
                                     className="dashboard-drawer-select-field"
                                     floatingLabelText="Choose a phrase"
                                     floatingLabelFixed={true}
                                     floatingLabelStyle={{color: '#19A5E4'}}
                                     style={{width: "200px"}}>
                            {this.state.phrases}
                        </SelectField>
                    </div>
                    <div style={{textAlign:"left", marginLeft:"30px"}}>
                        <SelectField value={this.state.personaValue}
                                     onChange={this._handlePersonaSelectFieldChange.bind(this)}
                                     className="dashboard-drawer-select-field"
                                     floatingLabelText="Choose a persona"
                                     floatingLabelFixed={true}
                                     floatingLabelStyle={{color: '#19A5E4'}}
                                     style={{width: "200px"}}>
                            {this.state.personas}
                        </SelectField>
                    </div>
                </Drawer>
                <Dialog
                    title="Add a phrase, persona & response"
                    actions={actions}
                    modal={false}
                    open={this.state.dialogOpen}
                    onRequestClose={this._handleDialogClose.bind(this)}
                >
                    <TextField type="text"
                               value={this.state.addPhrase}
                               inputStyle={{textAlign: "center"}}
                               style={{marginLeft: "10%"}}
                               errorText={this.state.addPhraseErrorCode}
                               onChange={this._handlePhraseTextFieldChange.bind(this)}
                               id="addPhraseTextField"
                               onKeyPress={this._handleKeyPress.bind(this)}
                               placeholder="Phrase" />
                    <TextField type="text"
                               value={this.state.addPersona}
                               inputStyle={{textAlign: "center"}}
                               errorText={this.state.addPersonaErrorCode}
                               onChange={this._handlePersonaTextFieldChange.bind(this)}
                               id="addPersonaTextField"
                               onKeyPress={this._handleKeyPress.bind(this)}
                               placeholder="Persona" />
                    <TextField type="text"
                               value={this.state.addResponse}
                               inputStyle={{textAlign: "center"}}
                               style={{width:"512px", marginLeft: "10%"}}
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