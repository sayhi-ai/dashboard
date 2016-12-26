import React from 'react'

export default class Response extends React.Component {
    render() {
        return (
            <div className='flex justify-between items-center hide-child'>
                <div
                    className='br4 white pointer pv2 ph3 ma1 f5'
                    style={{
                        backgroundColor: '#19A5E4',
                        wordBreak: 'break-all'
                    }}
                >
                    {this.props.response}
                </div>
                <div className='flex'>
                    <div className='child pointer ttu f6 red' onClick={this.props.onDelete}>
                        delete
                    </div>
                </div>
            </div>
        )
    }
}