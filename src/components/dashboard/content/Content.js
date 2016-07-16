import React from 'react';
import ContentCard from "./ContentCard"
import persona from "../../../resources/img/persona.svg"
import reqwest from "reqwest"
import when from "when"
var sayhi = require('sayhi-ai');

export default class Content extends React.Component {

    constructor(props) {
        super(props)
        sayhi.initWithToken(this.props.jwt, this._sayHiCallback)
    }
    
    _sayHiCallback(data) {
        console.log(data)
        sayhi.addResponse({phrase: "hi", persona: "vader", text: "hoaeu"}, this._test)
    }

    _test() {

    }

    render() {

        let responses = [{
            persona: "neutral",
            response: "Hello there."
        }, {
            persona: "Darth Vader",
            response: "Hi my apprentice."
        }, {
            persona: "neutral",
            response: "The force is strong in you."
        }, {
            persona: "Bro",
            response: "Hey."
        }]
        
        return (
            <div className="content-div">
                <ContentCard avatar={persona} responses={responses}/>
            </div>
        );
    }
}