import React from 'react'
import {Route, IndexRoute} from "react-router"

// import components
import LoginComponent from "./components/login/LoginComponent"

export default (
    <Route path='/'>
        <IndexRoute component={LoginComponent} />
    </Route>
)