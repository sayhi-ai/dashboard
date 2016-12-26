import React from "react"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class MuiTheme extends React.Component {
  render() {
    const muiTheme = getMuiTheme({
      fontFamily: 'Header-Font, sans-serif',
      palette: {
        primary1Color: "#19A5E4",
        primary2Color: "#19A5E4",
        primary3Color: "#19A5E4",
        accent1Color: "#19A5E4",
        accent2Color: "#19A5E4",
        accent3Color: "#19A5E4"
      }
    })

    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            {this.props.children}
          </div>
        </MuiThemeProvider>
      </div>
    )
  }

}