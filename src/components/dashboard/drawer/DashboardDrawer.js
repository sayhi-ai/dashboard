import React from 'react';
import Drawer from 'material-ui/Drawer';
import TextField from "material-ui/TextField"
import SearchStore from "../../../stores/searchStore"
import {searchTerms} from "../../../actions/searchAction"
import SearchConstants from '../../../constants/searchConstants.js';
import {List, ListItem} from 'material-ui/List';
import logoTitleImage from "../../../resources/img/logowithtext.png"
import Icon from "../../app/Icon"
import key from "../../../resources/img/key.svg"
import persona from "../../../resources/img/persona.svg"

export default class DashboardDrawer extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            searchResults: []
        }
    }

    componentDidMount() {
        SearchStore.addChangeListener(this._updateSearchResults.bind(this))
    }

    componentWillUnmount() {
        SearchStore.removeChangeListener(this._updateSearchResults.bind(this))
    }

    _fireSearchAction(e) {
        let searchInput = e.target.value.split(" ");
        if (searchInput.length !== 0) {
            searchTerms(searchInput)
        }
    }

    _updateSearchResults() {
        let styles = {
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
        
        let results = SearchStore.getAll()
        let resultComponents
        if (results[0].type != undefined) {
            resultComponents = results.map(res => {
                    if (res.type === SearchConstants.KEY) {
                        return <ListItem innerDivStyle={{textAlign: "left"}} primaryText={res.name}
                                         leftIcon={<Icon styles={styles} svg={key}/>}/>
                    } else {
                        return <ListItem innerDivStyle={{textAlign: "left"}} primaryText={res.name}
                                         leftIcon={<Icon styles={styles} svg={persona}/>}/>
                    }
                }
            )
        } else {
            resultComponents = []
        }

        this.setState({
            searchResults: resultComponents
        })
    }

    render() {
        return (
            <Drawer open={true} className="dashboard-drawer">
                <img className="dashboard-logo" src={logoTitleImage}/>
                <TextField type="text"
                           id="dashboard-drawer-search-field"
                           className="dashboard-drawer-search-field"
                           onChange={this._fireSearchAction.bind(this)}
                           placeholder="Search" />
                <List>
                    {this.state.searchResults}
                </List>
            </Drawer>
        )
    }
}