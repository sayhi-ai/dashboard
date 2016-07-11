import React from 'react';
import Drawer from 'material-ui/Drawer';
import TextField from "material-ui/TextField"
import {List, ListItem} from 'material-ui/List';
import logoTitleImage from "../../resources/img/logowithtext.png"
import Icon from "../app/Icon"
import key from "../../resources/img/key.svg"
import persona from "../../resources/img/persona.svg"

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var styles = {
            display: "block", 
            fill: "rgb(117, 117, 117)",
            height: "24px",
            width: "24px",
            transition: "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
            position: "absolute",
            top: "0px",
            margin: "12px",
            left: "4px",
            WebkiUserSelect: "none"
        }

        return (
            <div className="dashboard-screen">
                <Drawer open={true} className="dashboard-drawer">
                    <img className="dashboard-logo" src={logoTitleImage}/>
                    <TextField type="text" 
                               className="dashboard-drawer-search-field" 
                               placeholder="Search" />
                    <List>
                        <ListItem innerDivStyle={{textAlign: "left"}} primaryText="Key" 
                                  leftIcon={<Icon styles={styles} svg={key}/>}/>
                        <ListItem innerDivStyle={{textAlign: "left"}} primaryText="Persona" 
                                  leftIcon={<Icon styles={styles} svg={persona}/>}/>
                    </List>
                </Drawer>
            </div>
        );
    }
}