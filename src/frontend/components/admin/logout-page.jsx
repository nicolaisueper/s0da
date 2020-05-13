import React from 'react';
import {Redirect} from "react-router";
import {logout} from "../../helpers";

export const LogoutPage = props => {
    logout();
    return (<Redirect to={'/'}/>)
};
