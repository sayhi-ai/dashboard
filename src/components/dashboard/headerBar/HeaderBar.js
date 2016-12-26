import React from 'react';
import AppBar from 'material-ui/AppBar';
import Icon from '../../app/Icon'
import {logout} from '../../../actions/loginActions'

export default class HeaderBar extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='flex vw-100 items-center white ph3 justify-between' style={{height: 55, background: '#19A5E4'}}>
                <div className='flex items-center'>
                    <div className='f4' style={{fontFamily: 'Hero-Font'}}>
                        Sayhi.ai
                    </div>
                </div>
                <div className='flex pointer' onClick={logout}>
                    <Icon svg={require('../../../resources/img/key.svg')} style={{width: '18px', fill: 'white'}}/>
                </div>
            </div>
        );
    }
}