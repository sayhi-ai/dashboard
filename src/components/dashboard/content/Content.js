import React from 'react';
import ContentCard from "./ContentCard"
import SearchConstants from '../../../constants/searchConstants';

export default class Content extends React.Component {
    render() {
        return (
            <div className="content-div">
                <ContentCard title="Darth Vader" type={SearchConstants.PERSONA} content=""/>
                <ContentCard title="hi" type={SearchConstants.KEY} content=""/>
                <ContentCard title="bye" type={SearchConstants.KEY} content=""/>
            </div>
        );
    }
}