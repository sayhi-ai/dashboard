import React from 'react'
import {Route, IndexRedirect} from "react-router"

// Import components
import App from "./components/app/App"
import Login from "./components/login/Login"
import CreateAccount from "./components/login/CreateAccount"
import Dashboard from "./components/dashboard/Dashboard"

export default (
    <Route path='/' component={App}>
        <IndexRedirect to="login"/>
        <Route name="login" path="login" component={Login}/>
        <Route name="account" path="account">
            <Route name="create" path="create" component={CreateAccount}/>
        </Route>
        <Route name="dashboard" path="dashboard" component={Dashboard}/>
    </Route>
)