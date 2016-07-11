import React from 'react';

export default class Icon extends React.Component {
    render() {
        return (
            <div>
                <i style={this.props.styles} dangerouslySetInnerHTML={{__html: this.props.svg}}/>
            </div>
        )
    }
}