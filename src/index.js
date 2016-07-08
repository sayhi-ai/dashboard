import 'babel-polyfill'
import React from "react"
import ReactDOM from "react-dom"
import {Router, browserHistory} from 'react-router'

// import route
import routes from "./route"

// Copy the index.html file
require('file?name=[name].[ext]!./index.html');

ReactDOM.render((
    <Router
        forceFetch
        routes={routes}
        history={browserHistory}
    />
), document.getElementById('root'))