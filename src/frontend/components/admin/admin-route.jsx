import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {authenticationService} from "../../services/auth-service";
import {AdminPage} from "./admin-page";

export const AdminRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;
        if (!currentUser) {
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        } else {
            return <AdminPage />
        }
    }} />
)
