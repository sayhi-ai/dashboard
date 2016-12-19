import React from 'react';
import ResponseView from "./ResponseView"
import persona from "../../../resources/img/persona.svg"

export default class Content extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="content-div">
                <ResponseView/>
            </div>
        );
    }
}