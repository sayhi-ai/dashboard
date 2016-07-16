import React from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Icon from "../../app/Icon"
var Immutable = require('immutable');
import SearchStore from "../../../stores/searchStore"
import SayHiStore from "../../../stores/sayhiStore"

export default class ContentCard extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            phrase: "Hi",
            persona: "Neutral",
            addResponseText: '',
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
            .filter(res => {
                console.log(phrase, persona)
                return phrase === res.phrase && persona === res.persona
            })
            .map(res => <TableRow><TableRowColumn>{res.text}</TableRowColumn></TableRow>)
        
        this.setState({
            responses: Immutable.List(responseComponents)
        })
    }

    _updatePhrase() {
        let phrase = SearchStore.getPhrase()

        if (phrase !== "") {
            this.setState({
                phrase: phrase
            })
            
            this._updateSearchResults(phrase, this.state.persona)
        }
    }

    _updatePersona() {
        let persona = SearchStore.getPersona()

        if (persona !== "") {
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
        e.preventDefault()
        let response = this.state.addResponseText

        if (response !== "" && response.length < 200) {
            // add the response
            this._addResponse(response)
        }
    }

    _handleKeyPress(event) {
        if(event.key == 'Enter'){
            this._handleAddClick(event)
        }
    }
    
    _addResponse(response) {
        this.setState({
            addResponseText: '',
            responses: this.state.responses.push(
                <TableRow>
                    <TableRowColumn>{response}</TableRowColumn>
                </TableRow>
            )
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
                <Card className="content-card" onKeyPress={this._handleKeyPress.bind(this)}>
                    <CardHeader
                        title={"\"" + this.state.phrase + "\""}
                        style={{fontFamily: "Hero-Font"}}
                        titleStyle={{paddingTop: "10px"}}
                        subtitle={this.state.persona}
                        avatar={<Icon styles={avatarStyle} svg={this.props.avatar}/>}
                        actAsExpander={false}
                        showExpandableButton={false}
                    />
                    <CardText expandable={false}>
                        <h3 className="content-card-code-example">
                            <span>sayhi.say(</span>
                            <span className="blue-syntax">{"\"" + this.state.phrase + "\""}</span>
                            <span>{", "}</span>
                            <span className="blue-syntax">{"\"" + this.state.persona + "\""}</span>
                            <span>{");"}</span>
                        </h3>
                        <Table className="disable-select">
                            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                <TableRow>
                                    <TableHeaderColumn className="content-table-title">
                                        Responses
                                    </TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false} className="content-table-text">
                                {this.state.responses}
                            </TableBody>
                        </Table>
                    </CardText>
                    <CardActions style={cardActionStyle} expandable={false}>
                        <RaisedButton labelStyle={{color:"#FFFFFF", textTransform:"none"}}
                                      primary={true}
                                      onClick={this._handleAddClick.bind(this)}
                                      label="Add"/>
                        <TextField type="text"
                                   style={{paddingLeft: "10px"}}
                                   value={this.state.addResponseText}
                                   onChange={this._setAddResponseText.bind(this)}
                                   id="addResponseText"
                                   placeholder="Response" />
                    </CardActions>
                </Card>
        );
    }
}