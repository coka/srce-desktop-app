import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import CallsView from './calls/components/CallsView.jsx';
import CallsStatistic from './calls/components/CallsStatistic.jsx';
import AdminPanel from './administration/components/AdminPanel';
import SingleCallView from './calls/components/SingleCallView';

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={CallsView} />
                <Route exact path="/call" component={SingleCallView} />
                <Route exact path="/calls" component={CallsView} />
                <Route
                    exact
                    path="/calls-statistics"
                    component={CallsStatistic}
                />
                <Route exact path="/admin-page" component={AdminPanel} />
            </Switch>
        );
    }
}

export default Routes;
