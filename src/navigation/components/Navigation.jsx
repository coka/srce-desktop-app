import React, { Component } from 'react';
import { HashRouter, Route, Link } from "react-router-dom";
import SingleCallsView from '../../calls/components/SingleCallsView.jsx';
import CallsView from '../../calls/components/CallsView.jsx';

class Navigation extends Component {
    render() {
        return (
            <nav className="container-fluid navbar navbar-expand-sm navbar-light bg-light">
                <Link className="navbar-brand" to="/">NSOSS</Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/calls">Dnevni</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/call">Pojedinačni</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/calls-statistics">Pregled</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin">Admin</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    } 
}

export default Navigation;