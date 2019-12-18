import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Form,
    Dropdown,
    DropdownButton,
    ButtonToolbar,
    Button
} from 'react-bootstrap';
import { FaSave, FaPencilAlt, FaCopy, FaFileCsv } from 'react-icons/fa';
import { IoIosExit } from 'react-icons/io';

import { ExportToCsv } from 'export-to-csv';
import { format } from 'date-fns';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

const localizedCallColumns = {
    call_id: 'ID poziva',
    date: 'Datum',
    duration: 'Trajanje',
    person: 'Osoba',
    type: 'Tip',
    risk: 'Rizik',
    volunteer: 'Volonter'
};

class SingleCallsView extends Component {
    constructor(props){
        super(props);
        this.state={
            //call: {
                // Call
                callNo: 0,
                contactType: 'Vrsta kontakta',
                callDate: '',
                callDay: 0,
                callTime: 0,
                callDur: 0,
                callType: 'Vrsta poziva',

                // Caller
                name: '',
                gender: 'Pol',
                age: 'Starost',
                maritalStatus: 'Bracno stanje',
                numOfCall: 'Koji put zove',
                planInvolvement: 'Ukljucenost u plan',
                volunteer: [],
                selectedVolunteer: 'Volonter',

                // Call Desc
                problemType: 'Vrsta problema',
                suicidRisk: 'Suicidni rizik',
                suicidFactor: 'Suicidni faktor',
                lastSuicidTry: 'Prethodni pokusaji suicida',
                shortContent: '',
                note: ''
            //}
        }
    }

    componentDidMount() {
        ipcRenderer.send('getVolunteerNames');
        ipcRenderer.once('volunteerNamesSent', (event, volunteerNames) => {
            this.setState({ volunteer: volunteerNames });
        });
    }

    handleChangeInput = event => {
        const target = event.target;
        const value =
            target.type === 'text' || target.type === 'textarea'
                ? target.value
                : target.textContent;
        const name = target.name;

        this.setState({ [name]: value });
    };

    // Buttons
    handleSaveData = () => {
        console.log('Save');
    };

    handleUpdateData = () => {
        console.log('Update');
    };

    handleCopyData = () => {
        console.log('Copy');
    };

    handleExportToExcel = () => {
        const callData = [
            {
                call_id: 1,
                date: '12/11/2201',
                duration: 51,
                person: 'Joca',
                type: 'Potrebna pomoc',
                risk: 'veliki',
                novo: 'novo',
                volunteer: 'Stojkovic'
            },
            {
                call_id: 2,
                date: '12/11/2051',
                duration: 33,
                person: 'Ceca',
                type: 'Potrebna pomoc',
                risk: 'mali',
                volunteer: 'Marko'
            },
            {
                call_id: 3,
                date: '12/11/2011',
                duration: 15,
                person: 'Naca',
                type: 'Hitan slucaj',
                risk: 'srednji',
                volunteer: 'Ljilja'
            },
            {
                call_id: 4,
                date: '12/11/2031',
                duration: 24,
                person: 'Zaca',
                type: 'Hitan slucaj',
                risk: 'srednji',
                volunteer: 'Ljilja'
            },
            {
                call_id: 5,
                date: '24/11/2019',
                duration: 87,
                person: 'Kaca',
                type: 'Hitan slucaj',
                risk: 'srednji',
                volunteer: 'Ljilja'
            }
        ];

        const headers = Object.keys(callData[0]).map(
            (key, index) => localizedCallColumns[key]
        );

        const options = {
            filename: 'callData-' + format(new Date(), 'dd-MM-yyyy_hh-mm'),
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: false,
            useTextFile: false,
            useBom: true,
            headers
        };

        const csvExporter = new ExportToCsv(options);

        csvExporter.generateCsv(callData);
    };

    handleExit = () => {
        console.log('Exit');
    };

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <Form.Text className="text-muted">Poziv</Form.Text>

                            <Form.Group controlId="formBasicCallNo">
                                <Form.Label>Redni broj poziva</Form.Label>
                                <Form.Control
                                    onChange={this.handleChangeInput}
                                    type="text"
                                    placeholder="Unesite redni broj poziva"
                                    name="callNo"
                                />
                            </Form.Group>

                            <DropdownButton
                                variant="outline-secondary"
                                id="dropdown-basic-button"
                                title={this.state.contactType}
                            >
                                <Dropdown.Item
                                    name="contactType"
                                    onClick={this.handleChangeInput}
                                >
                                    Vrsta1
                                </Dropdown.Item>
                                <Dropdown.Item
                                    name="contactType"
                                    onClick={this.handleChangeInput}
                                >
                                    Vrsta2
                                </Dropdown.Item>
                                <Dropdown.Item
                                    name="contactType"
                                    onClick={this.handleChangeInput}
                                >
                                    Vrsta3
                                </Dropdown.Item>
                            </DropdownButton>

                            <Form.Group controlId="formBasicCallDate">
                                <Form.Label>Datum poziva</Form.Label>
                                <Form.Control
                                    onChange={this.handleChangeInput}
                                    type="text"
                                    placeholder="Unesite datum poziva"
                                    name="callDate"
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicDay">
                                <Form.Label>Dan</Form.Label>
                                <Form.Control
                                    onChange={this.handleChangeInput}
                                    type="text"
                                    placeholder="Unesite dan"
                                    name="callDay"
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicCallTime">
                                <Form.Label>Vreme poziva</Form.Label>
                                <Form.Control
                                    onChange={this.handleChangeInput}
                                    type="text"
                                    placeholder="Unesite vreme poziva"
                                    name="callTime"
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicCallDuration">
                                <Form.Label>Trajanje poziva</Form.Label>
                                <Form.Control
                                    onChange={this.handleChangeInput}
                                    type="text"
                                    placeholder="Unesite trajanje poziva"
                                    name="callDur"
                                />
                            </Form.Group>

                            <DropdownButton
                                variant="outline-secondary"
                                id="dropdown-basic-button"
                                title={this.state.callType}
                            >
                                <Dropdown.Item
                                    name="callType"
                                    onClick={this.handleChangeInput}
                                >
                                    Vrsta1
                                </Dropdown.Item>
                                <Dropdown.Item
                                    name="callType"
                                    onClick={this.handleChangeInput}
                                >
                                    Vrsta2
                                </Dropdown.Item>
                                <Dropdown.Item
                                    name="callType"
                                    onClick={this.handleChangeInput}
                                >
                                    Vrsta3
                                </Dropdown.Item>
                            </DropdownButton>
                        </Form>
                    </Col>

                    <Col>
                        <Form>
                            <Form.Text className="text-muted">
                                Pozivar
                            </Form.Text>

                            <Form.Group controlId="formBasicName">
                                <Form.Label>Ime ili nadimak</Form.Label>
                                <Form.Control
                                    onChange={this.handleChangeInput}
                                    type="text"
                                    placeholder="Unesite ime ili nadimak"
                                    name="callName"
                                />
                            </Form.Group>

                            <DropdownButton
                                variant="outline-secondary"
                                id="dropdown-basic-button"
                                title={this.state.gender}
                            >
                                <Dropdown.Item
                                    name="gender"
                                    onClick={this.handleChangeInput}
                                >
                                    Pol1
                                </Dropdown.Item>
                                <Dropdown.Item
                                    name="gender"
                                    onClick={this.handleChangeInput}
                                >
                                    Pol2
                                </Dropdown.Item>
                                <Dropdown.Item
                                    name="gender"
                                    onClick={this.handleChangeInput}
                                >
                                    Pol3
                                </Dropdown.Item>
                            </DropdownButton>

                            <DropdownButton
                                variant="outline-secondary"
                                id="dropdown-basic-button"
                                title={this.state.age}
                            >
                                <Dropdown.Item
                                    name="age"
                                    onClick={this.handleChangeInput}
                                >
                                    St1
                                </Dropdown.Item>
                                <Dropdown.Item
                                    name="age"
                                    onClick={this.handleChangeInput}
                                >
                                    St2
                                </Dropdown.Item>
                                <Dropdown.Item
                                    name="age"
                                    onClick={this.handleChangeInput}
                                >
                                    St3
                                </Dropdown.Item>
                            </DropdownButton>

                            <DropdownButton
                                variant="outline-secondary"
                                id="dropdown-basic-button"
                                title={this.state.maritalStatus}
                            >
                                <Dropdown.Item
                                    name="maritalStatus"
                                    onClick={this.handleChangeInput}
                                >
                                    Bs1
                                </Dropdown.Item>
                                <Dropdown.Item
                                    name="maritalStatus"
                                    onClick={this.handleChangeInput}
                                >
                                    Bs2
                                </Dropdown.Item>
                                <Dropdown.Item
                                    name="maritalStatus"
                                    onClick={this.handleChangeInput}
                                >
                                    Bs3
                                </Dropdown.Item>
                            </DropdownButton>

                            <DropdownButton
                                variant="outline-secondary"
                                id="dropdown-basic-button"
                                title={this.state.numOfCall}
                            >
                                <Dropdown.Item
                                    name="numOfCall"
                                    onClick={this.handleChangeInput}
                                >
                                    Prvi
                                </Dropdown.Item>
                                <Dropdown.Item
                                    name="numOfCall"
                                    onClick={this.handleChangeInput}
                                >
                                    Drugi
                                </Dropdown.Item>
                                <Dropdown.Item
                                    name="numOfCall"
                                    onClick={this.handleChangeInput}
                                >
                                    Treci
                                </Dropdown.Item>
                            </DropdownButton>

                            <DropdownButton
                                variant="outline-secondary"
                                id="dropdown-basic-button"
                                title={this.state.planInvolvement}
                            >
                                <Dropdown.Item
                                    name="planInvolvement"
                                    onClick={this.handleChangeInput}
                                >
                                    Plan1
                                </Dropdown.Item>
                                <Dropdown.Item
                                    name="planInvolvement"
                                    onClick={this.handleChangeInput}
                                >
                                    Plan2
                                </Dropdown.Item>
                                <Dropdown.Item
                                    name="planInvolvement"
                                    onClick={this.handleChangeInput}
                                >
                                    Plan3
                                </Dropdown.Item>
                            </DropdownButton>

                            <DropdownButton
                                variant="outline-secondary"
                                id="dropdown-basic-button"
                                title={this.state.selectedVolunteer}
                            >
                                {this.state.volunteer.map((v, i) => {
                                    return (
                                        <Dropdown.Item
                                            key={i}
                                            name="selectedVolunteer"
                                            onClick={this.handleChangeInput}
                                            active={
                                                v.first_name +
                                                    ' ' +
                                                    v.last_name ===
                                                this.state.selectedVolunteer
                                            }
                                        >
                                            {v.first_name + ' ' + v.last_name}
                                        </Dropdown.Item>
                                    );
                                })}
                            </DropdownButton>
                        </Form>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form>
                            <Form.Text className="text-muted">
                                Opis razgovora
                            </Form.Text>

                            <DropdownButton
                                variant="outline-secondary"
                                id="dropdown-basic-button"
                                title={this.state.problemType}
                            >
                                <Dropdown.Item
                                    name="problemType"
                                    onClick={this.handleChangeInput}
                                >
                                    Prob1
                                </Dropdown.Item>
                                <Dropdown.Item
                                    name="problemType"
                                    onClick={this.handleChangeInput}
                                >
                                    Prob2
                                </Dropdown.Item>
                                <Dropdown.Item
                                    name="problemType"
                                    onClick={this.handleChangeInput}
                                >
                                    Prob3
                                </Dropdown.Item>
                            </DropdownButton>

                            <DropdownButton
                                variant="outline-secondary"
                                id="dropdown-basic-button"
                                title={this.state.suicidRisk}
                            >
                                <Dropdown.Item
                                    name="suicidRisk"
                                    onClick={this.handleChangeInput}
                                >
                                    s1
                                </Dropdown.Item>
                                <Dropdown.Item
                                    name="suicidRisk"
                                    onClick={this.handleChangeInput}
                                >
                                    s2
                                </Dropdown.Item>
                                <Dropdown.Item
                                    name="suicidRisk"
                                    onClick={this.handleChangeInput}
                                >
                                    s3
                                </Dropdown.Item>
                            </DropdownButton>

                            <DropdownButton
                                variant="outline-secondary"
                                id="dropdown-basic-button"
                                title={this.state.suicidFactor}
                            >
                                <Dropdown.Item
                                    name="suicidFactor"
                                    onClick={this.handleChangeInput}
                                >
                                    sf1
                                </Dropdown.Item>
                                <Dropdown.Item
                                    name="suicidFactor"
                                    onClick={this.handleChangeInput}
                                >
                                    sf2
                                </Dropdown.Item>
                                <Dropdown.Item
                                    name="suicidFactor"
                                    onClick={this.handleChangeInput}
                                >
                                    sf3
                                </Dropdown.Item>
                            </DropdownButton>

                            <DropdownButton
                                variant="outline-secondary"
                                id="dropdown-basic-button"
                                title={this.state.lastSuicidTry}
                            >
                                <Dropdown.Item
                                    name="lastSuicidTry"
                                    onClick={this.handleChangeInput}
                                >
                                    p1
                                </Dropdown.Item>
                                <Dropdown.Item
                                    name="lastSuicidTry"
                                    onClick={this.handleChangeInput}
                                >
                                    p2
                                </Dropdown.Item>
                                <Dropdown.Item
                                    name="lastSuicidTry"
                                    onClick={this.handleChangeInput}
                                >
                                    p3
                                </Dropdown.Item>
                            </DropdownButton>
                        </Form>
                    </Col>

                    <Col>
                        <Form>
                            <Form.Group controlId="exampleForm.ControlDescription">
                                <Form.Label>Kratak sadrzaj</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="2"
                                    onChange={this.handleChangeInput}
                                    name="shortContent"
                                />
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlNote">
                                <Form.Label>Napomena</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    onChange={this.handleChangeInput}
                                    name="note"
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>

                <Row className="justify-content-md-center">
                    <Col xs={10} lg={8}>
                        <ButtonToolbar className="call-form-buttons">
                            <Button
                                onClick={this.handleSaveData}
                                variant="outline-primary"
                            >
                                <FaSave />
                                &nbsp;Snimi
                            </Button>
                            <Button
                                onClick={this.handleUpdateData}
                                variant="outline-secondary"
                            >
                                <FaPencilAlt />
                                &nbsp;Izmeni
                            </Button>
                            <Button
                                onClick={this.handleCopyData}
                                variant="outline-warning"
                            >
                                <FaCopy />
                                &nbsp;Kopiraj
                            </Button>
                            <Button
                                onClick={this.handleExportToExcel}
                                variant="outline-success"
                            >
                                <FaFileCsv />
                                &nbsp;Prebaci u CSV
                            </Button>
                            <Button
                                onClick={this.handleExit}
                                variant="outline-danger"
                            >
                                <IoIosExit />
                                &nbsp;Izadji
                            </Button>
                        </ButtonToolbar>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default SingleCallsView;
