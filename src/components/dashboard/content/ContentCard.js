import React from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

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
        return (
                <Card className="content-card">
                    <CardHeader
                        title="Without Avatar"
                        subtitle="Subtitle"
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                    </CardText>
                    <CardActions expandable={true}>
                        <FlatButton label="Add response"/>
                        <TextField type="text"
                                   value={this.state.addResponseText}
                                   onChange={this._setAddResponseText.bind(this)}
                                   id="addResponseText"
                                   placeholder="Add a custome response" />
                    </CardActions>
                </Card>
        );
    }
}