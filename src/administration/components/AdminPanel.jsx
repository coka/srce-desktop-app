import React, { Component } from 'react';
import {
    Container,
    Table,
    Form,
    Button
} from 'react-bootstrap';
import { FaUserMinus, FaUserPlus, FaPencilAlt } from 'react-icons/fa';
import { format } from 'date-fns';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            volunteers: [],
            inputFirstName: '',
            inputLastName: '',
            errorMessage: '',
            firstNameValid: false,
            lastNameValid: false
        }
        this.handleBlur = this.handleBlur.bind(this);
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

        const regex = /^([A-Za-z]+\s)*[A-Za-z]*$/;
        if (target.value === '' || regex.test(target.value)) {
            this.setState({ [name]: value },
                () => { this.validateField(name, value) });
        }
    }

    handleBlur = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        let err = '';
        
        if (nam === "inputFirstName") {
          if (val ==="") {
            err = <strong>Polje ime ne sme biti prazno!</strong>;
            this.setState({
                firstNameValid: false
            });
          } 
        }
        if (nam === "inputLastName") {
            if (val ==="") {
              err = <strong>Polje prezime ne sme biti prazno!</strong>;
              this.setState({
                lastNameValid: false
              });
            }
          }
        this.setState({errorMessage: err});
        this.setState({[nam]: val});
        
    }

    validateField(fieldName, value) {
    let firstNameValid = this.state.firstNameValid;
    let lastNameValid = this.state.lastNameValid;
    
    switch (fieldName) {
        case 'inputFirstName':
            firstNameValid = value.match(/^([A-Za-z]+\s)*[A-Za-z]+$/);
            break;
        case 'inputLastName':
            lastNameValid = value.match(/^([A-Za-z]+\s)*[A-Za-z]+$/);
            break;
        default:
            break;
    }

    this.setState({
        firstNameValid: firstNameValid,
        lastNameValid: lastNameValid
    });
}


handleAddVolunteer = newVolunteer => {
    ipcRenderer.send('insertVolunteer', newVolunteer);
    ipcRenderer.once('volunteerInserted', (event, insertedID) => {
        if (insertedID) {
            newVolunteer.volunteer_id = insertedID;
            this.setState({
                volunteers: [...this.state.volunteers, newVolunteer],
                inputFirstName: '',
                inputLastName: '',
                firstNameValid: false,
                lastNameValid: false
            });
        } else {
            console.log('Something went wrong...');
        }
    });
}

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
}

render() {
    return (
        <Container fluid>
            <Table>
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
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() =>
                                            this.handleDeleteVolunteer(
                                                v.volunteer_id
                                            )
                                        }
                                    >
                                        {' '}
                                        Izbriši &nbsp;
                                            <FaUserMinus />
                                    </Button>
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
                            <Form>
                                <Form.Group controlId="formBasicFirstName">
                                    <Form.Label>Ime</Form.Label>
                                    <input
                                        type="text"
                                        name="inputFirstName"
                                        value={this.state.inputFirstName}
                                        onChange={this.handleChangeInput}
                                        onBlur={this.handleBlur}
                                        className="form-control"
                                        id="exampleInputFirstName1"
                                        placeholder="Unesite ime volontera"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicLastName">
                                    <Form.Label>Prezime</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="inputLastName"
                                        value={this.state.inputLastName}
                                        onChange={this.handleChangeInput}
                                        onBlur={this.handleBlur}
                                        className="form-control"
                                        placeholder="Unesite prezime volontera"
                                        required
                                    />
                                </Form.Group>
                                <Button
                                    variant="success"
                                    size="sm"
                                    disabled={!(this.state.firstNameValid && this.state.lastNameValid)}
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
                                </Button>
                                <div className="panel panel-default" style={{color: "red"}}>
                                { this.state.errorMessage && <h5 className="error"> { this.state.errorMessage } </h5> }
                                </div>
                            </Form>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    );
}
}

export default Admin;
