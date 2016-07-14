import React from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import SearchConstants from '../../../constants/searchConstants';
import Icon from "../../app/Icon"
import key from "../../../resources/img/key.svg"
import persona from "../../../resources/img/persona.svg"
var Immutable = require('immutable');

export default class ContentCard extends React.Component {
    
    constructor(props) {
        super(props)

        let responseComponents = this.props.responses.map(res =>
            <TableRow>
                <TableRowColumn style={{width: "150px"}}>{res.persona}</TableRowColumn>
                <TableRowColumn>{res.response}</TableRowColumn>
            </TableRow>
        )

        let immutableList = Immutable.List(responseComponents)

        this.state = {
            addResponseText: '',
            addResponseType: '',
            responses: immutableList
        }
    }

    _setAddResponseText(e) {
        this.setState({
            addResponseText: e.target.value
        })
    }

    _setAddResponseType(e) {
        this.setState({
            addResponseType: e.target.value
        })
    }

    _handleAddClick(e) {
        e.preventDefault()
        let response = this.state.addResponseText
        let responseType = this.state.addResponseType

        if (response !== "" && response.length < 200 && responseType !== "" && responseType.length < 30) {
            // add the response
            this._addResponse(responseType, response)
        }
    }

    _handleKeyPress(event) {
        if(event.key == 'Enter'){
            this._handleAddClick(event)
        }
    }
    
    _addResponse(responseType, response) {
        this.setState({
            addResponseText: '',
            addResponseType: '',
            responses: this.state.responses.push(
                <TableRow>
                    <TableRowColumn>{responseType}</TableRowColumn>
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

        let avatar = key
        let subtitle = "Key"
        let tableType = "Persona"
        if (this.props.type === SearchConstants.PERSONA) {
            avatar = persona
            subtitle = "Persona"
            tableType = "Key"
        }
        
        return (
                <Card className="content-card" onKeyPress={this._handleKeyPress.bind(this)}>
                    <CardHeader
                        title={this.props.title}
                        style={{fontFamily: "Hero-Font"}}
                        titleStyle={{paddingTop: "10px"}}
                        subtitle={subtitle}
                        avatar={<Icon styles={avatarStyle} svg={avatar}/>}
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                        <Table>
                            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                <TableRow>
                                    <TableHeaderColumn style={{width: "150px"}} className="content-table-title">
                                        {tableType}
                                    </TableHeaderColumn>
                                    <TableHeaderColumn className="content-table-title">
                                        Response
                                    </TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false} className="content-table-text">
                                {this.state.responses}
                            </TableBody>
                        </Table>
                    </CardText>
                    <CardActions style={cardActionStyle} expandable={true}>
                        <RaisedButton labelStyle={{color:"#FFFFFF", textTransform:"none"}}
                                      primary={true}
                                      onClick={this._handleAddClick.bind(this)}
                                      label="Add"/>
                        <TextField type="text"
                                   style={{paddingLeft: "10px", width: "150px"}}
                                   value={this.state.addResponseType}
                                   onChange={this._setAddResponseType.bind(this)}
                                   id="addResponseText"
                                   placeholder={tableType} />
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