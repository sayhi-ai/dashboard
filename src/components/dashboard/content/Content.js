import React from 'react';
import ContentCard from "./ContentCard"

export default class Content extends React.Component {
    render() {
        return (
            <div className="content-div">
                <ContentCard/>
                <ContentCard/>
                <ContentCard/>
            </div>
        );
    }
}