import React from 'react';
import ContentCard from "./ContentCard"
import SearchConstants from '../../../constants/searchConstants';

export default class Content extends React.Component {
    render() {

        let responses = [{
            persona: "neutral",
            response: "Dude"
        }, {
            persona: "Darth Vader",
            response: "Luke, I am your father."
        }, {
            persona: "neutral",
            response: "Cool."
        }, {
            persona: "Bro",
            response: "I am awesome."
        }]
        
        return (
            <div className="content-div">
                <ContentCard title="Darth Vader" type={SearchConstants.PERSONA} responses={responses}/>
                <ContentCard title="hi" type={SearchConstants.KEY} responses={responses}/>
                <ContentCard title="bye" type={SearchConstants.KEY} responses={responses}/>
            </div>
        );
    }
}