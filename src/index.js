import 'babel-polyfill'
import React from "react"
import ReactDOM from "react-dom"
import {Router} from 'react-router'
import {login} from './actions/loginActions'
import 'tachyons'
import browserHistory from './history'

// import route
import routes from "./route"

// import stylesheet
require('./index.scss')

// Copy the index.html file
require('file?name=[name].[ext]!./index.html')

ReactDOM.render((
  <Router
    forceFetch
    routes={routes}
    history={browserHistory}
  />
), document.getElementById('root'))