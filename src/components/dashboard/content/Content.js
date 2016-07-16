import React from 'react';
import ContentCard from "./ContentCard"
import persona from "../../../resources/img/persona.svg"

export default class Content extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="content-div">
                <ContentCard avatar={persona} responses={this.props.responses}/>
            </div>
        );
    }
}