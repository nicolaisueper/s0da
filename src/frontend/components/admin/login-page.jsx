import React, {useEffect, useState} from 'react';
import {LoginForm} from "./login-form";
import {authenticationService} from "../../services/auth-service";
import {Redirect} from "react-router";

export const LoginPage = props => {

    let [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        // redirect to home if already logged in
        if (authenticationService.currentUserValue) {
            setShouldRedirect(true);
        }
    }, [])

    return (shouldRedirect && <Redirect to={'/'} /> || <div>
        <h1 className={'app-title'} aria-label={'Soda Admin'}>S🥤da - Admin</h1>
        <p className={'app-subtitle'}>A refreshing login form...</p>
        <LoginForm/>
    </div>)
};
