import React from 'react';
import {authenticationService} from "../../services/auth-service";
import {Redirect} from "react-router";

export const LogoutPage = props => {
    authenticationService.logout();
    return (<Redirect to={'/'}/>)
};
