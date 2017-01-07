import React from 'react'
import {Route, IndexRedirect} from "react-router"

// Import components
import App from "./components/app/App"
import NoAuthContainer from "./components/noAuth/noAuthContainer"
import Dashboard from "./components/dashboard/Dashboard"
import BotContainer from "./components/dashboard/content/bots/BotsContainer"
import BotSettingsContainer from "./components/dashboard/content/bots/BotSettingsContainer"
import ResponseContainer from "./components/dashboard/content/response/ResponseContainer"
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

    <Route name="dashboard" component={Dashboard}>
      <Route name="bots" path="bots" component={BotContainer}/>
      <Route name="bots" path="bot/:bot" component={BotSettingsContainer}/>
      <Route name="responses" path="bot/:bot/phrase/:phrase" component={ResponseContainer}/>
    </Route>
  </Route>
)