import React from 'react';
import AuthenticatedComponent from '../app/AuthenticatedComponent';
import Account from "./account/Account"
import DashboardDrawer from "./drawer/DashboardDrawer"
import Content from "./content/Content"
import {initSearch} from "../../actions/searchAction"
import {distributeData} from "../../actions/sayhiAction"
var sayhi = require('sayhi-ai');

export default AuthenticatedComponent(class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        sayhi.initWithToken(this.props.jwt, this._sayHiInitCallback.bind(this))
    }

    _sayHiInitCallback(data) {

        //sayhi.addResponse({phrase: "hi", persona: "vader", text: "hoaeu"}, this._actionCallback.bind(this))
        initSearch(data.phrases.map(phrase => phrase.name), data.personas.map(persona => persona.name))
        distributeData(data.responses)
    }

    render() {
        return (
            <div className="dashboard-screen">
                <Account/>
                <Content/>
            </div>
        );
    }
})