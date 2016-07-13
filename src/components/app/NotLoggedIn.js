import React from 'react';
import Paper from "material-ui/Paper"
import logoTitleImage from "../../resources/img/logowithtext.png"
import { Link } from 'react-router'

export default class NotLoggedIn extends React.Component {
    render() {
        return (
            <div className="login-screen">
                <div className="login-outter">
                    <div className="login-inner">
                        <Paper className="login-div" zDepth={5}>
                            <img className="login-logo" src={logoTitleImage}/>
                            <div className="login-form-div">
                                <h4 className="not-logged-in-text">
                                    Please <Link className="not-logged-in-link" to="login">log in</Link> to see this site.
                                </h4>
                            </div>
                        </Paper>
                    </div>
                </div>
            </div>
        )
    }

}