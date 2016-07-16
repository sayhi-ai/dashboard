import React from 'react';
import AuthenticatedComponent from '../app/AuthenticatedComponent';
import Account from "./account/Account"
import DashboardDrawer from "./drawer/DashboardDrawer"
import Content from "./content/Content"
import {setPhrasesAndPersonas} from "../../actions/searchAction"
var sayhi = require('sayhi-ai');

export default AuthenticatedComponent(class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        sayhi.initWithToken(this.props.jwt, this._sayHiInitCallback.bind(this))

        this.state = {
            phrases: [],
            personas: [],
            responses: [{}]
        }
    }

    _sayHiInitCallback(data) {

        // sayhi.addResponse({phrase: "hi", persona: "vader", text: "hoaeu"}, this._actionCallback.bind(this))
        setPhrasesAndPersonas(data.phrases.map(phrase => phrase.name), data.personas.map(persona => persona.name))
        
        this.setState = {
            phrases: data.phrases.map(phrase => phrase.name),
            personas: data.personas.map(persona => persona.name),
            responses: data.responses
        }
    }

    render() {
        return (
            <div className="dashboard-screen">
                <Account/>
                <DashboardDrawer/>
                <Content responses={this.state.responses}/>
            </div>
        );
    }
})