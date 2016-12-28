import React from 'react'
import {Route, IndexRedirect} from "react-router"

// Import components
import App from "./components/app/App"
import NoAuthContainer from "./containers/noAuth/noAuthContainer"
import Login from "./components/noAuth/Login"
import CreateAccount from "./components/noAuth/CreateAccount"
import Dashboard from "./components/dashboard/Dashboard"

export default (
  <Route path='/' component={App}>
    <IndexRedirect to="login"/>
    <Route name="noAuth" component={NoAuthContainer}>
      <Route name="login" path="login" component={Login}/>
      <Route name="create-account" path="account/create" component={CreateAccount}/>
    </Route>
    <Route name="dashboard" path="dashboard" component={Dashboard}/>
  </Route>
)