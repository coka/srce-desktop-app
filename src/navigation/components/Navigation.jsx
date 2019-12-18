import React, { Component } from 'react';
import { Link } from 'react-router-dom';
let Logo=require('./logo_new_srce.png')

class Navigation extends Component {
    render() {
        return (
            <nav className=" navbar navbar-expand-sm  ">
                <Link className="navbar-brand" to="/">
                    <img src={Logo} style={{height: '40px', width:'80px'}} className="ml-1" alt="logo"/>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/calls">
                                Dnevni
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/call">
                                Pojedinačni
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/calls-statistics">
                                Pregled
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link text-danger" to="/admin-page">
                                Admin
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navigation;
