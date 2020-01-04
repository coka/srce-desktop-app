import Routes from './Routes.jsx';
import React, { Component, useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoMdMoon as Moon, IoMdSunny as Sun, IoMdMore as More } from 'react-icons/io';
import ThemeContext from '../../theme/ThemeContext';
import { fileRead } from '../../user_settings/loadUserSettings';

let dark, toggle, isDarkThemeActive;
class Navigation extends Component {
    static contextType = ThemeContext;

    constructor(props) {
        super(props);
        this.state = {
            isDropdownShowing: false,
            isDarkThemeActive: fileRead(),
            location: "/"
        }
        this.handleDropdown = this.handleDropdown.bind(this);
    }

    handleLocationParameter(location) {
        this.setState({ location });
    }

    handleDropdown() {
        this.state.isDropdownShowing ? this.setState({ isDropdownShowing: false }) : this.setState({ isDropdownShowing: true })
    }

    componentDidMount() {
        const context = this.context
        dark = context.dark;
        toggle = context.toggle;
    }

    componentDidUpdate() {
        const context = this.context
        dark = context.dark;
        toggle = context.toggle;
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-sm">
                    <div className="navbar-brand link-cursor" onClick={() => this.handleLocationParameter("/")}>
                        Logo
                </div>

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
                            <li className="nav-item nav-link link-cursor" onClick={() => this.handleLocationParameter("calls")}>
                                Dnevni
                        </li>
                            <li className="nav-item nav-link link-cursor" onClick={() => this.handleLocationParameter("call")}>
                                Pojedinačni
                        </li>
                            <li className="nav-item nav-link link-cursor" onClick={() => this.handleLocationParameter("calls-statistics")}>
                                Pregled
                        </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item nav-link link-cursor" onClick={() => this.handleLocationParameter("admin-page")}>
                                Admin
                        </li>
                            <li className="nav-item dropdown m-0">
                                <a className="nav-link pt-0 pb-0 pointer" onClick={this.handleDropdown} style={{ fontSize: '25px' }}>
                                    < More />
                                </a>
                                <div className="dropdown-menu-srce dropdown-menu-right" style={{ display: this.state.isDropdownShowing ? 'block' : 'none' }}>
                                    <div className="dropdown-item m-0 pr-2 pl-5 " >
                                        <input className="pointer mr-1" type="checkbox" id="gridCheck1" onClick={() => { this.setState(prevState => ({ isDropdownShowing: false, isDarkThemeActive: !prevState.isDarkThemeActive })); toggle() }} checked={this.state.isDarkThemeActive}></input>
                                        Tamna tema
                                </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Routes navState={this.state.location} />
            </div>
        );
    }
}

export default Navigation;
