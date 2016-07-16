import React from 'react';
import AuthenticatedComponent from '../app/AuthenticatedComponent';
import Account from "./account/Account"
import DashboardDrawer from "./drawer/DashboardDrawer"
import Content from "./content/Content"

export default AuthenticatedComponent(class Dashboard extends React.Component {
    render() {
        return (
            <div className="dashboard-screen">
                <Account user={this.props.user}/>
                <DashboardDrawer/>
                <Content jwt={this.props.jwt}/>
            </div>
        );
    }
})