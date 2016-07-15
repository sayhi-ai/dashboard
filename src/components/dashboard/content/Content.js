import React from 'react';
import ContentCard from "./ContentCard"
import SearchConstants from '../../../constants/searchConstants';
import persona from "../../../resources/img/persona.svg"

export default class Content extends React.Component {
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