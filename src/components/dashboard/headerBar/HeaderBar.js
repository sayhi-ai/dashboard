import React from 'react';
import AppBar from 'material-ui/AppBar';

export default class HeaderBar extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <AppBar
                title="Title"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
        );
    }
}