import React from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import SearchConstants from '../../../constants/searchConstants';
import Icon from "../../app/Icon"
import key from "../../../resources/img/key.svg"
import persona from "../../../resources/img/persona.svg"

export default class ContentCard extends React.Component {
    
    constructor() {
        super()
        this.state = {
            addResponseText: ''
        }
    }

    _setAddResponseText(e) {
        this.setState({
            addResponseText: e.target.value
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
        if (this.props.type === SearchConstants.KEY) {
            avatar = persona
            subtitle = "Persona"
        }
        
        return (
                <Card className="content-card">
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
                                    <TableHeaderColumn className="content-table-title">
                                        Responses
                                    </TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}
                                       className="content-table-text">
                                <TableRow>
                                    <TableRowColumn>1</TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn>2</TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn>3</TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn>4</TableRowColumn>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardText>
                    <CardActions style={cardActionStyle} expandable={true}>
                        <RaisedButton labelStyle={{color:"#FFFFFF", textTransform:"none"}}
                                      primary={true}
                                      onClick={console.log("click")}
                                      label="Add"/>
                        <TextField type="text"
                                   style={{paddingLeft: "10px"}}
                                   value={this.state.addResponseText}
                                   onChange={this._setAddResponseText.bind(this)}
                                   id="addResponseText"
                                   placeholder="Add a custom response" />
                    </CardActions>
                </Card>
        );
    }
}