import React from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Icon from "../../app/Icon"
import SearchStore from "../../../stores/searchStore"
import SayHiStore from "../../../stores/sayhiStore"
import classnames from 'classnames'
var Immutable = require('immutable');
var sayhi = require('sayhi-ai');


export default class ContentCard extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            snackBarColor: '',
            snackBarText : '',
            phrase: "Hi",
            persona: "Neutral",
            addResponseText: '',
            addResponseError: '',
            data: [],
            responses: []
        }
    }

    componentDidMount() {
        SearchStore.addChangeListener(this._updatePhrase.bind(this))
        SearchStore.addChangeListener(this._updatePersona.bind(this))
        SayHiStore.addChangeListener(this._setData.bind(this))
    }

    componentWillUnmount() {
        SearchStore.removeChangeListener(this._updatePhrase.bind(this))
        SearchStore.removeChangeListener(this._updatePersona.bind(this))
        SayHiStore.removeChangeListener(this._setData.bind(this))
    }
    
    _setData() {
        let data = SayHiStore.getData()
        
        this.setState({
            data: data
        })

        this._updateSearchResults(this.state.phrase, this.state.persona)
    }

    _updateSearchResults(phrase, persona) {
        let responseComponents = this.state.data
            .filter(res => phrase === res.phrase && persona === res.persona)
            .map(res => res.text)
        
        this.setState({
            responses: Immutable.List(responseComponents)
        })
    }

    _updatePhrase() {
        let phrase = SearchStore.getPhrase()

        if (phrase !== "" && phrase !== this.state.phrase) {
            this.setState({
                phrase: phrase
            })
            
            this._updateSearchResults(phrase, this.state.persona)
        }
    }

    _updatePersona() {
        let persona = SearchStore.getPersona()

        if (persona !== "" && persona !== this.state.persona) {
            this.setState({
                persona: persona
            })

            this._updateSearchResults(this.state.phrase, persona)
        }
    }

    _setAddResponseText(e) {
        this.setState({
            addResponseText: e.target.value
        })
    }

    _handleAddClick(e) {
        let response = this.state.addResponseText

        if (response !== "" && response.length < 200) {
            this.setState({
                addResponseError: ''
            })
            sayhi.addResponse({
                phrase: this.state.phrase, 
                persona: this.state.persona, 
                text: response
            }, this._addResponse.bind(this, response))
        } else {
            this.setState({
                addResponseError: "Sorry, something went wrong (Responses can be no longer than 200 characters)."
            })
        }
    }

    _handleKeyPress(event) {
        if(event.key == 'Enter'){
            this._handleAddClick(event)
        }
    }
    
    _addResponse(response, data) {
        this.setState({
            addResponseText: '',
            responses: this.state.responses.push(response)
        })
    }

    _handleSnackBarClose() {
        this.setState({
            open: false
        })
    }

    render() {
        let avatarStyle = {
            display: "inline-block",
            fill: "rgb(117, 117, 117)",
            height: "24px",
            width: "24px",
            transition: "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
            top: "0px",
            margin: "12px",
            left: "4px",
            WebkiUserSelect: "none"
        }
        
        let cardActionStyle = {
            padding: "16px"
        }
        
        return (
            <div className='flex justify-center'>
                <div className='w-100' style={{maxWidth: 750}}>
                    <div className='ma3 pa3 br2' style={{backgroundColor: '#555'}}>
                        <div className='w-100 tc courier f3'>
                            <span className='white'>ai.say(</span>
                            <span style={{color: 'rgb(100, 215, 228)'}}>{'"' + this.state.phrase + '"'}</span>
                            <span className='white'>{");"}</span>
                        </div>
                    </div>
                    <div className='ma3 pa3 br2 bg-white'>
                        {this.state.responses.map(response => 
                            <div className='flex justify-start items-center'>
                                <div
                                    className='br4 white pointer dim pv2 ph3 ma1 f5'
                                    style={{
                                        backgroundColor: '#19A5E4'
                                    }}
                                >
                                    {response}
                                </div>
                            </div>
                        )}
                        <div className='flex items-center mt2 h-100 w-100 justify-stretch'>
                            <input
                                className='br-pill ba b--black pv2 ph3 ma1 outline-0 f5 flex-auto'
                                type='text'
                                placeholder='Add new response'
                                onChange={this._setAddResponseText.bind(this)}
                                onKeyDown={this._handleKeyPress.bind(this)}
                                value={this.state.addResponseText}/>
                            <div className='flex ba br-100 justify-center items-center pointer dim ml2'
                                style={{
                                    width: 36,
                                    height: 36
                                }}
                                onClick={this._handleAddClick.bind(this)}
                            >
                                +
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
