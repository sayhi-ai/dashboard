import React from 'react';
import Drawer from 'material-ui/Drawer';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import {changePhrase, changePersona} from "../../../actions/searchAction"
import logoTitleImage from "../../../resources/img/logowithtext.png"
import SearchStore from "../../../stores/searchStore"
var Immutable = require('immutable');

export default class DashboardDrawer extends React.Component {
    
    constructor(props) {
        super(props)
        
        this.state = {
            phraseValue: 1,
            personaValue: 1,
            phrases: [],
            personas: []
        }
    }

    componentDidMount() {
        SearchStore.addChangeListener(this._setPhrasesAndPersonas.bind(this))
    }

    componentWillUnmount() {
        SearchStore.addChangeListener(this._setPhrasesAndPersonas.bind(this))
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
    
    _setPhrasesAndPersonas() {
        let phrases = SearchStore.getAllPhrases()
        let personas = SearchStore.getAllPersonas()
        
        if (phrases.length > 0) {
            this.setState({
                phrases: this._initPhraseList(phrases)
            })
        }
        
        if (personas.length > 0) {
            this.setState({
                personas: this._initPersonaList(personas)
            })
        }
    }

    _handlePhraseSelectFieldChange = (event, index, value) => {
        if (!value) {
            
        } else {
            changePhrase(this.phrasesText.get(value - 1))
            this.setState({phraseValue: value});
        }
    }
    
    _handlePersonaSelectFieldChange = (event, index, value) => {
        if (!value) {

        } else {
            changePersona(this.personaText.get(value - 1))
            this.setState({personaValue: value})
        }
    }

    render() {
        return (
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
        )
    }
}