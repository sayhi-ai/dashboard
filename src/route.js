import React from 'react'
import {Route, IndexRedirect} from "react-router"

// import components
import App from "./components/app/App"
import Login from "./components/login/Login"
import Dashboard from "./components/dashboard/Dashboard"

export default (
    <Route path='/' component={App}>
        <IndexRedirect to="login"/>
        <Route name="login" path="login" component={Login}/>
        <Route name="home" path="dashboard" component={Dashboard}/>
    </Route>
)