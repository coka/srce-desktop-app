import React, {Component} from "react";
import {Switch, BrowserRouter, Route} from 'react-router-dom';
import CallsView from "./calls/components/CallsView.jsx";
import SingleCallsView from "./calls/components/SingleCallsView.jsx";
import CallsStatistic from "./calls/components/CallsStatistic.jsx";
import Admin from "./calls/components/Admin.jsx"

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={CallsView} />
                <Route exact path="/call" component={SingleCallsView} />
                <Route exact path="/calls" component={CallsView} />
                <Route exact path="/calls-statistics" component={CallsStatistic} />
                <Route exact path="/admin" component={Admin} />
            </Switch>
        );
    }
}

export default Routes;