import React from 'react';
import AuthenticatedComponent from '../app/AuthenticatedComponent';
import Account from "./account/Account"
import HeaderBar from "./headerBar/HeaderBar"
import DashboardDrawer from "./drawer/DashboardDrawer"
import Content from "./content/Content"

export default AuthenticatedComponent(class Dashboard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="flex flex-column min-vh-100">
                <HeaderBar/>
                <div className='flex w-100 flex-auto'>
                    <DashboardDrawer/>
                    <div className='flex-auto'>
                        <Content/>
                    </div>
                </div>
            </div>
        );
    }
})