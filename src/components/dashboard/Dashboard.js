import React from 'react';
import DashboardDrawer from "./drawer/DashboardDrawer"
import Account from "./account/Account"
import AuthenticatedComponent from '../app/AuthenticatedComponent';

export default AuthenticatedComponent(class Dashboard extends React.Component {
    render() {
        return (
            <div className="dashboard-screen">
                <Account user={this.props.user}/>
                <DashboardDrawer/>
            </div>
        );
    }
})