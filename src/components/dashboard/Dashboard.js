import React from 'react';
import DashboardDrawer from "./drawer/DashboardDrawer"
import AuthenticatedComponent from '../app/AuthenticatedComponent';

export default AuthenticatedComponent(class Dashboard extends React.Component {
    render() {
        return (
            <div className="dashboard-screen">
                <DashboardDrawer/>
            </div>
        );
    }
})