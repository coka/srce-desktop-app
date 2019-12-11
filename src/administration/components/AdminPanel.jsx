import React, { Component } from 'react';
import { FaUserMinus, FaUserPlus, FaPencilAlt } from 'react-icons/fa';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchVolunteers from '../../redux/actions/fetchVolunteers';
import insertVolunteer from '../../redux/actions/insertVolunteer';
import deleteVolunteer from '../../redux/actions/deleteVolunteer';
import {
    getVolunteersError,
    getVolunteers,
    getVolunteersPending
} from '../../redux/reducers/volunteersReducer';

class AdminPanel extends Component {
    state = {
        inputFirstName: '',
        inputLastName: '',
        isSaveButtonEnabled: false
    };
    componentDidMount() {
        this.props.fetchVolunteers();
    }
    handleChangeInput = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({ [name]: value });
    };
    handleAddVolunteer = newVolunteer => {
        this.props.insertVolunteer(newVolunteer);

        this.setState({ inputFirstName: '', inputLastName: '' });
    };
    handleDeleteVolunteer = id => {
        this.props.deleteVolunteer(id);
    };
    render() {
        const { items } = this.props.volunteers;
        return (
            <div className="container-fluid col-lg-12">
                <table className="table">
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
                        {items.map((v, i) => {
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
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    error: getVolunteersError(state),
    volunteers: getVolunteers(state),
    pending: getVolunteersPending(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            fetchVolunteers: fetchVolunteers,
            insertVolunteer: newVolunteer => insertVolunteer(newVolunteer),
            deleteVolunteer: id => deleteVolunteer(id)
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
