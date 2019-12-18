import React, { Component } from 'react';
import { FaUserMinus, FaUserPlus, FaPencilAlt } from 'react-icons/fa';
import { format } from 'date-fns';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class Admin extends Component {
    constructor(props){
        super(props);
        this.state={
            volunteers: [],
            inputFirstName: '',
            inputLastName: '',
            isSaveButtonEnabled: false
        }
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleAddVolunteer = this.handleAddVolunteer.bind(this);
        this.handleDeleteVolunteer = this.handleDeleteVolunteer.bind(this);
    }
    componentDidMount() {
        ipcRenderer.send('getVolunteers');
        ipcRenderer.once('volunteersSent', (event, volunteers) => {
            this.setState({ volunteers: volunteers });
        });
    }
    handleChangeInput = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({ [name]: value });
    };
    handleAddVolunteer = newVolunteer => {

        console.log("handle add vol");
        ipcRenderer.send('insertVolunteer', newVolunteer);
        ipcRenderer.once('volunteerInserted', (event, insertedID) => {
            if (insertedID) {
                newVolunteer.volunteer_id = insertedID;
                this.setState({
                    volunteers: [...this.state.volunteers, newVolunteer],
                    inputFirstName: '',
                    inputLastName: ''
                });
            } else {
                console.log('Something went wrong...');
            }
        });
    };
    handleDeleteVolunteer = id => {
        ipcRenderer.send('deleteVolunteer', id);
        ipcRenderer.once('volunteerDeleted', (event, isDeleted) => {
            if (isDeleted) {
                this.setState({
                    volunteers: this.state.volunteers.filter(
                        v => v.volunteer_id !== id
                    ),
                    inputFirstName: '',
                    inputLastName: ''
                });
            } else {
                console.log('Volunteer with id: ' + id + ' does not exists.');
            }
        });
    };

    render(){
        return(
            <div>
                <div className="row border-top border-bottom border-green mr-0 pr-0">
                    <form className="col-12 m-0 pr-0 pl-5 mt-3 mb-3 ">
                        <div className="form-row mr-0 align-items-center">
                            <div className="form-group col-md-5">
                                <label htmlFor="name">Ime</label>
                                <input name="inputFirstName" value={this.state.inputFirstName} type="text" className="form-control" id="name" onChange={this.handleChangeInput}/>
                            </div>
                            <div className="form-group col-md-5">
                                <label htmlFor="surname">Prezime</label>
                                <input name="inputLastName" value={this.state.inputLastName} type="text" className="form-control" id="surname" onChange={this.handleChangeInput}/>
                            </div>
                            <div className="form-group col-md-1 mt-3 pt-3">
                            <button
                                className="btn btn-dark-green ml-2 form-control"
                                disabled={
                                    !(
                                        this.state.inputFirstName &&
                                        this.state.inputLastName
                                    )
                                }
                                onClick={() =>
                                    this.handleAddVolunteer({
                                        first_name: this.state
                                            .inputFirstName,
                                        last_name: this.state
                                            .inputLastName,
                                        created_at: new Date().toISOString()
                                    })
                                }>
                                    {' '}
                                Dodaj &nbsp;
                                <FaUserPlus />
                            </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="row ml-1 mr-0">
                    <table className="table">
                        <thead striped hover className="call-data table mt-3" >
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Ime</th>
                                <th scope="col">Prezime</th>
                                <th scope="col">Datum dodavanja</th>
                                <th scope="col"> </th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.volunteers.map((v, i) => {
                            return (
                                <tr key={i}>
                                    <th scope="row">{v.volunteer_id}</th>
                                    <td>{v.first_name}</td>
                                    <td>{v.last_name}</td>
                                    <td>
                                        {format(
                                            new Date(Date.parse(v.created_at)),
                                            'dd.MM.yyyy'
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={() =>
                                                this.handleDeleteVolunteer(
                                                    v.volunteer_id
                                                )
                                            }
                                        >
                                            {' '}
                                            Izbriši &nbsp;
                                            <FaUserMinus />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table> 
                </div>
            </div>
        )
    }
}

export default Admin;
