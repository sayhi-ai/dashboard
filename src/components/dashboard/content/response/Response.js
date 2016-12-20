import React from 'react'

export default class Response extends React.Component {
    render() {
        return (
            <div className='flex justify-start items-center'>
                <div
                    className='br4 white pointer dim pv2 ph3 ma1 f5'
                    style={{
                        backgroundColor: '#19A5E4',
                        wordBreak: 'break-all'
                    }}
                >
                    {this.props.response}
                </div>
            </div>
        )
    }
}