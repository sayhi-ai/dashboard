import React from "react"
import MuiTheme from './MuiTheme';

export default class App extends React.Component {
    render() {
        return (
            <MuiTheme>
                {this.props.children}
            </MuiTheme>
        )
    }
}