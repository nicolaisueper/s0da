import React from 'react';
import {Link} from "react-router-dom";
import {AdminSettings} from "./admin-settings";

export const AdminDashboard = props => {

    return (<div>
        <h1 className={'app-title'} aria-label={'Soda Admin'}>S🥤da - Admin</h1>
        <p className={'app-subtitle'}>A refreshing admin interface...</p>
        <div className="nav">
            <Link className={'btn btn-logout'} to={'/logout'}>Log out</Link>
        </div>
        <AdminSettings/>
    </div>)
};
