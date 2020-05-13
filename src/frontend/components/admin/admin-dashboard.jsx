import React from 'react';
import {Link} from "react-router-dom";

export const AdminDashboard = props => {

    return (<div>
        <h1 className={'app-title'} aria-label={'Soda Admin'}>S🥤da - Admin</h1>
        <p className={'app-subtitle'}>A refreshing admin interface...</p>

        Hi! Right now, you can only <Link to={'/logout'}>Log out</Link>!
    </div>)
};
