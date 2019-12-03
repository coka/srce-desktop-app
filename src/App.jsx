import React, { Component, createContext } from 'react';
import Navigation from './navigation/components/Navigation.jsx';
import Routes from './Routes.jsx';
import Contexts from './contexts/Contexts.jsx';

class App extends Component {
    render () {
        return (
            <Contexts>
                <div className='container-fluid'>
                    <div className="row">
                    <Navigation/>
                    <Routes />
                    </div>
                </div>
            </Contexts>
        );
    }

    logout(){
        console.log("Logout called")
    }

};

export default App;
