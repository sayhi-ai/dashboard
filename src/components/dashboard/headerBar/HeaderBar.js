import React from 'react';
import AppBar from 'material-ui/AppBar';
import Icon from '../../app/Icon'

export default class HeaderBar extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='flex vw-100 items-center white ph3 justify-between' style={{height: 55, background: '#19A5E4'}}>
                <div className='flex items-center'>
                    <div className='f4'>
                        Sayhi.ai
                    </div>
                </div>
                <div className='flex'>
                    <Icon svg={require('../../../resources/img/key.svg')}/>
                </div>
            </div>
        );
    }
}