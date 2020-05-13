import React from 'react';
import ReactDOM from 'react-dom';
import {Timeline} from "./components/timeline/timeline";
import {Route, Switch} from 'react-router';
import {Admin} from "./admin";
import {BrowserRouter} from "react-router-dom";

const App = props => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <div>
                        <h1 className={'app-title'} aria-label={'Soda'}>S🥤da</h1>
                        <p className={'app-subtitle'}>A refreshing incident board...</p>
                        <h2 className={'timeline-title'}>Timeline</h2>
                        <Timeline/>
                    </div>
                </Route>
                <Route path="/admin">
                    <Admin/>
                </Route>
                <Route render={() => <h1>Page not found</h1>}/>
            </Switch>
        </BrowserRouter>)
};

ReactDOM.render(<App />, document.getElementById('app')
);
