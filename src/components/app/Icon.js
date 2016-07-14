import React from 'react';

export default class Icon extends React.Component {
    render() {
        return (
            <i style={this.props.styles} dangerouslySetInnerHTML={{__html: this.props.svg}}/>
        )
    }
}