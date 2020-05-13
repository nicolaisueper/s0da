import React from 'react';
import {LoginForm} from "./components/admin/login-form";

export const Admin = props => {
    return (<div>
        <h1 className={'app-title'} aria-label={'Soda Admin'}>S🥤da - Admin</h1>
        <p className={'app-subtitle'}>A refreshing admin interface...</p>

        <LoginForm />
    </div>)
};
