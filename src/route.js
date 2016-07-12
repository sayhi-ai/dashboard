import React from 'react'
import {Route, IndexRoute} from "react-router"

// import components
import App from "./components/app/App"
import Login from "./components/login/Login"
import Dashboard from "./components/dashboard/Dashboard"

export default (
    <Route path='/' component={App}>
        <IndexRoute name="login" component={Login} />
        <Route name="home" path="dashboard" component={Dashboard} />
    </Route>
)