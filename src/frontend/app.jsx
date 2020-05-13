import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {Timeline} from "./components/timeline/timeline";
import {Redirect, Route, Switch} from 'react-router';
import {BrowserRouter} from "react-router-dom";
import {authenticationService} from "./services/auth-service";
import {customHistory} from "./helpers";
import {AdminRoute} from "./components/admin/admin-route";
import {LoginPage} from "./components/admin/login-page";
import {LogoutPage} from "./components/admin/logout-page";

const App = props => {

    let [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        authenticationService.currentUser.subscribe(x => setCurrentUser(x));
    }, [])

    return (
        <BrowserRouter history={customHistory}>
            <Switch>
                <Route exact path="/">
                    <div>
                        <h1 className={'app-title'} aria-label={'Soda'}>S🥤da</h1>
                        <p className={'app-subtitle'}>A refreshing incident board...</p>
                        <h2 className={'timeline-title'}>Timeline</h2>
                        <Timeline/>
                    </div>
                </Route>
                <Route exact path={'/logout'} component={LogoutPage} />
                <AdminRoute exact path="/admin"/>
                <Route path="/login" component={LoginPage} />
                <Route render={() => <h1>Page not found</h1>}/>
            </Switch>
        </BrowserRouter>)
};

ReactDOM.render(<App/>, document.getElementById('app'));
