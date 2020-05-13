import React, {useEffect, useState} from 'react';
import {authenticationService} from "../../services/auth-service";
import {Link} from "react-router-dom";
import {handleResponse} from "../../helpers";

export const AdminPage = props => {

    let [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        setCurrentUser(authenticationService.currentUserValue)
    }, [])

    fetch('/api/admin', {credentials: 'include'})
        .then(res => (res.ok && res.json()) || res).then(res => {
        if (!res.username || res.username !== currentUser.username) {
            authenticationService.logout();
            location.reload(true);
        }
    });

    return (<div>
        <h1 className={'app-title'} aria-label={'Soda Admin'}>S🥤da - Admin</h1>
        <p className={'app-subtitle'}>A refreshing admin interface...</p>

        Hi, {currentUser.username}! Right now, you can only <Link to={'/logout'}>Log out</Link>!

    </div>)
};
