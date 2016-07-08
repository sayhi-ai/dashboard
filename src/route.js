import React from 'react'
import {Route, IndexRoute} from "react-router"

// import components
import Login from "./components/login/Login"

export default (
    <Route path='/'>
        <IndexRoute component={Login} />
    </Route>
)