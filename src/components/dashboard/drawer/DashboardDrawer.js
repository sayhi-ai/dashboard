import React from 'react';
import Drawer from 'material-ui/Drawer';
import SearchStore from "../../../stores/searchStore"
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import {changePhrase, changePersona} from "../../../actions/searchAction"
import SearchConstants from '../../../constants/searchConstants.js';
import logoTitleImage from "../../../resources/img/logowithtext.png"
import Icon from "../../app/Icon"
import key from "../../../resources/img/key.svg"
import persona from "../../../resources/img/persona.svg"
var Immutable = require('immutable');

export default class DashboardDrawer extends React.Component {
    
    constructor(props) {
        super(props)

        this.phrasesText = Immutable.List(["Hi", "Pokemon caught", "Pokemon info", "Bye"])
        this.phrasesText = this.phrasesText.push("Add a phrase...")
        this.personaText = Immutable.List(["Neutral", "Darth Vader", "Bro", "Pikachu"])
        this.personaText = this.personaText.push("Add a persona...")

        let i = 0 // Start at 0 because we add first
        let phrases = Immutable.List(this.phrasesText.map(phrase => {
            i++
            
            if (i === this.phrasesText.size) {
                return (
                    <div>
                        <Divider/>
                        <MenuItem value={i} primaryText={phrase}/>
                    </div>
                )
            } else {
                return <MenuItem value={i} primaryText={phrase}/> 
            }
        }))

        let j = 0 // Start at 0 because we add first
        let personas = Immutable.List(this.personaText.map(persona => {
            j++
            if (j === this.phrasesText.size) {
                return (
                    <div>
                        <Divider/>
                        <MenuItem value={j} primaryText={persona} />
                    </div>
                )
            } else {
                return <MenuItem value={j} primaryText={persona} />
            }
        }))
        
        this.state = {
            phraseValue: 1,
            personaValue: 1,
            phrases: phrases,
            personas: personas,
            searchResults: []
        }
    }

    _handlePhraseSelectFieldChange = (event, index, value) => {
        console.log(this.phrasesText)
        if (value == this.phrasesText.size) {
            
        } else {
            changePhrase(this.phrasesText.get(value - 1))
            this.setState({phraseValue: value});
        }
    }
    
    _handlePersonaSelectFieldChange = (event, index, value) => {
        if (value == this.personaText.size) {

        } else {
            changePersona(this.personaText.get(value - 1))
            this.setState({personaValue: value})
        }
    }

    _fireSearchAction(e) {
        let searchInput = e.target.value.split(" ");
        if (searchInput.length !== 0) {
            searchTerms(searchInput)
        }
    }

    render() {
        return (
            <Drawer open={true} className="dashboard-drawer">
                <img className="dashboard-logo" src={logoTitleImage}/>
                <h3 className="dashboard-drawer-search-title">Search for a response</h3>
                <div className="dashboard-drawer-persona-div">
                    <div style={{display: "inline-block", marginRight: "3%"}}>Phrase: </div>
                    <SelectField value={this.state.phraseValue}
                                 onChange={this._handlePhraseSelectFieldChange.bind(this)}
                                 className="dashboard-drawer-select-field"
                                 style={{width: "150px"}}>
                        {this.state.phrases}
                    </SelectField>
                </div>
                <div className="dashboard-drawer-persona-div" style={{marginBottom: "15%"}}>
                    <div style={{display: "inline-block", marginRight: "3%"}}>Persona: </div>
                    <SelectField value={this.state.personaValue}
                                 onChange={this._handlePersonaSelectFieldChange.bind(this)}
                                 className="dashboard-drawer-select-field"
                                 style={{width: "150px"}}>
                        {this.state.personas}
                    </SelectField>
                </div>
            </Drawer>
        )
    }
}