import React from 'react';
import ContentCard from "./ContentCard"
import SearchConstants from '../../../constants/searchConstants';

export default class Content extends React.Component {
    render() {

        let responses = ["response 1", "response 2", "response 3", "response 4"]
        return (
            <div className="content-div">
                <ContentCard title="Darth Vader" type={SearchConstants.PERSONA} responses={responses}/>
                <ContentCard title="hi" type={SearchConstants.KEY} responses={responses}/>
                <ContentCard title="bye" type={SearchConstants.KEY} responses={responses}/>
            </div>
        );
    }
}