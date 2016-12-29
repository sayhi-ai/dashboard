import React from 'react'
import {Route, IndexRedirect} from "react-router"

// Import components
import App from "./components/app/App"
import NoAuthContainer from "./components/noAuth/noAuthContainer"
import Dashboard from "./components/dashboard/Dashboard"
import Login from "./components/noAuth/Login"
import CreateAccount from "./components/noAuth/CreateAccount"
import ResetPassword from "./components/noAuth/resetPassword/ResetPassword"

export default (
  <Route path='/' component={App}>
    <IndexRedirect to="login"/>
    <Route name="noAuth" component={NoAuthContainer}>
      <Route name="login" path="login" component={Login}/>

      <Route name="account" path="account">
        <Route name="create" path="create" component={CreateAccount}/>

        <Route name="password" path="password">
          <Route name="reset" path="reset" component={ResetPassword}/>
        </Route>
      </Route>
    </Route>
    <Route name="dashboard" path="/" component={Dashboard}/>
  </Route>
)