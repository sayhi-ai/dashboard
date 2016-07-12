import React from 'react';
import DashboardDrawer from "./drawer/DashboardDrawer"

export default class Dashboard extends React.Component {
    
    render() {
        return (
            <div className="dashboard-screen">
                <DashboardDrawer/>
            </div>
        );
    }
}