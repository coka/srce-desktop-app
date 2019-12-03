import React, { Component, useState, createContext } from 'react';
import {
    FormGroup,
    FormControl,
    Button
} from 'react-bootstrap';

import { AdminContext } from '../../contexts/Contexts'


class CallsStatistic extends Component {
    static contextType = AdminContext;
      
    checkPassword = (handleLogAdmin) => {
        console.log(this.password.value);
        if(this.password.value === "sifra"){
            handleLogAdmin();
            console.log("Uspesno logovanje")
        } else {
            console.log("Neuspesno logovanje!!!")
        }
    }

    render(){
        const { isAdmin, handleLogAdmin } = this.context;

    return(
        <div className= "col-md-6">
            <div >

            {!isAdmin ? (
                <div>
                    <FormGroup controlId="password">
                        <label>Password</label>
                    <FormControl
                        ref = {x => this.password = x}
                        onChange = {this.handleChangeInput}
                        placeholder = "Unesite password za pristup stranici"
                        type = "password"
                        />
                    </FormGroup>

                    <Button block type="submit" onClick = {() => this.checkPassword(handleLogAdmin)}>
                        Login
                    </Button>
                </div>
            ) : (
                <div>
                    Hello Admin
                </div>
            )}
            </div>
        </div>
        
    );
}
}
export default CallsStatistic;