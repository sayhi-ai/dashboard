import React from "react"
import Favicon from "react-favicon"
import favicon from "../../resources/img/logo.png"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class MuiTheme extends React.Component {
    render() {
        const muiTheme = getMuiTheme({
            palette: {
                primary1Color: "#19A5E4",
                primary2Color: "#19A5E4",
                primary3Color: "#19A5E4"
            }
        })

        return (
            <div>
                <Favicon url={favicon}/>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div>
                        {this.props.children}
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }

}