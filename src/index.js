import 'babel-polyfill'
import React from "react"
import ReactDOM from "react-dom"
import {Router, browserHistory} from 'react-router'
import {loginAction} from './actions/loginActions'
import 'tachyons'

// import route
import routes from "./route"

// import stylesheet
require('./index.scss')

// Copy the index.html file
require('file?name=[name].[ext]!./index.html')

let jwt = localStorage.getItem('sayhi-jwt')
if (jwt) {
    loginAction(jwt)
}

ReactDOM.render((
    <Router
        forceFetch
        routes={routes}
        history={browserHistory}
    />
), document.getElementById('root'))