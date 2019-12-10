import React, { Component } from 'react';
import { FaUserMinus, FaUserPlus, FaPencilAlt } from 'react-icons/fa';
import { format } from 'date-fns';

import { Pagination } from 'react-bootstrap';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

const itemsPerPage = 5;

class AdminPanel extends Component {
    state = {
        volunteers: [],
        inputFirstName: '',
        inputLastName: '',
        isSaveButtonEnabled: false,
        count: 0,
        selectedPage: 1,
        numberOfPages: 1
    };
    componentDidMount() {
        this.handleGetVolunteers(0);
    }
    handleChangeInput = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({ [name]: value });
    };
    handleGetVolunteers = offset => {
        return new Promise(resolve => {
            ipcRenderer.send('getVolunteers', {
                offset: offset,
                limit: itemsPerPage
            });
            ipcRenderer.once('volunteersSent', async (event, result) => {
                this.setState(
                    {
                        volunteers: result.volunteers,
                        count: result.count
                    },
                    () => {
                        let numberOfPages = Math.floor(
                            result.count / itemsPerPage
                        );
                        result.count % itemsPerPage > 0
                            ? (numberOfPages += 1)
                            : (numberOfPages += 0);

                        this.setState(
                            {
                                numberOfPages: numberOfPages,
                                volunteers: result.volunteers,
                                selectedPage: offset / itemsPerPage + 1
                            },
                            () => {
                                resolve();
                            }
                        );
                    }
                );
            });
        });
    };
    handleAddVolunteer = newVolunteer => {
        ipcRenderer.send('insertVolunteer', newVolunteer);
        ipcRenderer.once('volunteerInserted', (event, insertedID) => {
            newVolunteer.volunteer_id = insertedID;
            if (insertedID) {
                this.handleGetVolunteers(0).then(() => {
                    this.setState({
                        inputFirstName: '',
                        inputLastName: '',
                        selectedPage: 1
                    });
                });
            } else {
                console.log('Something went wrong...');
            }
        });
    };
    handleDeleteVolunteer = id => {
        ipcRenderer.send('deleteVolunteer', id);
        ipcRenderer.once('volunteerDeleted', (event, isDeleted) => {
            const currentSelectedPage = this.state.selectedPage;
            if (isDeleted) {
                let offset = currentSelectedPage * itemsPerPage - itemsPerPage;
                this.handleGetVolunteers(offset).then(() => {
                    if (this.state.volunteers.length === 0) {
                        if (currentSelectedPage > 2) {
                            offset =
                                (currentSelectedPage - 1) * itemsPerPage -
                                itemsPerPage;
                            this.handleGetVolunteers(offset).then(() => {
                                this.setState({
                                    selectedPage: currentSelectedPage - 1
                                });
                            });
                        } else {
                            this.handleGetVolunteers(0);
                        }
                    }
                });
            } else {
                console.log('Volunteer with id: ' + id + ' does not exists.');
            }
        });
    };
    render() {
        let items = [];
        for (let number = 1; number <= this.state.numberOfPages; number++) {
            let endOfPage = number * itemsPerPage;
            items.push(
                <Pagination.Item
                    onClick={() =>
                        this.handleGetVolunteers(
                            endOfPage - itemsPerPage,
                            itemsPerPage
                        )
                    }
                    key={number}
                    active={number === this.state.selectedPage}
                >
                    {number}
                </Pagination.Item>
            );
        }

        const pagination = <Pagination>{items}</Pagination>;
        return (
            <div className="container-fluid col-lg-12">
                <table className="table table-of-volunteers">
                    <thead className="thead-light">
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
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                this.handleDeleteVolunteer(
                                                    v.volunteer_id
                                                )
                                            }
                                        >
                                            Izbriši &nbsp;
                                            <FaUserMinus />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="10">{pagination}</td>
                        </tr>

                        <tr>
                            <td colSpan="5">
                                <div className="border-top my-3"></div>
                                <h4 className="text-muted">
                                    <FaPencilAlt /> &nbsp;Unos novog volontera
                                </h4>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputFirstName">
                                            Ime
                                        </label>
                                        <input
                                            type="text"
                                            name="inputFirstName"
                                            value={this.state.inputFirstName}
                                            onChange={this.handleChangeInput}
                                            className="form-control"
                                            id="exampleInputFirstName1"
                                            placeholder="Unesite ime volontera"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputLastName">
                                            Prezime
                                        </label>
                                        <input
                                            type="text"
                                            name="inputLastName"
                                            value={this.state.inputLastName}
                                            onChange={this.handleChangeInput}
                                            className="form-control"
                                            id="exampleInputLastName1"
                                            placeholder="Unesite prezime volontera"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        disabled={
                                            !(
                                                this.state.inputFirstName &&
                                                this.state.inputLastName
                                            )
                                        }
                                        className="btn btn-success btn-sm"
                                        onClick={() =>
                                            this.handleAddVolunteer({
                                                first_name: this.state
                                                    .inputFirstName,
                                                last_name: this.state
                                                    .inputLastName,
                                                created_at: new Date().toISOString()
                                            })
                                        }
                                    >
                                        Dodaj &nbsp;
                                        <FaUserPlus />
                                    </button>
                                </form>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}

export default AdminPanel;
