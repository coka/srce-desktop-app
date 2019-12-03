import React, { Component, createContext } from 'react';

export const AdminContext = createContext();

class Contexts extends Component {
    state= {
        isAdmin: false
    }
    handleLogAdmin = () => {
        this.setState({
            isAdmin: !this.state.isAdmin
        });
    }
    render(){
        return(
            <AdminContext.Provider value={{...this.state, handleLogAdmin: this.handleLogAdmin}}>
                {this.props.children}
            </AdminContext.Provider>
        )
    }
}
export default Contexts;