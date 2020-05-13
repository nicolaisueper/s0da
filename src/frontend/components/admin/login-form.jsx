import React, {useEffect, useState} from 'react';
import {authenticationService} from "../../services/auth-service";
import {Redirect} from "react-router";

export const LoginForm = props => {

    const [state, setState] = useState({
        username: "",
        password: "",
        error: false,
        shouldRedirect: false
    });

    useEffect(() => {
        if (authenticationService.currentUserValue) {
            setShouldRedirect(true);
        }
    }, []);

    const handleChange = (e) => {
        const {id, value} = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    function setError(error) {
        setState(prevState => ({
            ...prevState,
            error: error
        }));
    }

    function setShouldRedirect(redirect) {
        setState(prevState => ({
            ...prevState,
            shouldRedirect: redirect
        }));
    }

    function formSubmit(e) {
        e.preventDefault();
        authenticationService.login(state.username, state.password)
            .then(
                user => {
                    setError(false);
                    const {from} = state || {from: {pathname: "/"}};
                    setShouldRedirect(true);
                },
                error => {
                    setError(true);
                }
            );
    }

    return (state.shouldRedirect && <Redirect to={'/admin'}/> || <form id={'login-form'} onSubmit={formSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" placeholder="Username" value={state.username} onChange={handleChange}/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Password" value={state.password} onChange={handleChange}/>
        <button type="submit">Login</button>
        <span className={'feedback' + (!state.error ? ' hidden' : '')}>Error logging in!</span>
    </form>)
};
