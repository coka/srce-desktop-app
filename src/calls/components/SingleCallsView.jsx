import React, { Component } from 'react';
import * as helper from '../../database/help';

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

class SingleCallsView extends Component {
    state = {
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
        volunteer: 'Volonter',

        // Call Desc
        problemType: 'Vrsta problema',
        suicidRisk: 'Suicidni rizik',
        suicidFactor: 'Suicidni faktor',
        lastSuicidTry: 'Prethodni pokusaji suicida',
        shortContent: '',
        note: '',

    };
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
        console.log('ExportToExcel');
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
                                variant="light"
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
                                variant="light"
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
                                variant="light"
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
                                variant="light"
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
                                variant="light"
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
                                variant="light"
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
                                variant="light"
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
                                variant="light"
                                id="dropdown-basic-button"
                                onClick = {this.funkcija}
                                title={this.state.volunteer}
                            >
                                <Dropdown.Item
                                    name="volunteer"
                                    onClick={this.handleChangeInput}
                                >
                                    Vol1
                                </Dropdown.Item>
                                <Dropdown.Item
                                    name="volunteer"
                                    onClick={this.handleChangeInput}
                                >
                                    Vol2
                                </Dropdown.Item>
                                <Dropdown.Item
                                    name="volunteer"
                                    onClick={this.handleChangeInput}
                                >
                                    Vol3
                                </Dropdown.Item>
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
                                variant="light"
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
                                variant="light"
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
                                variant="light"
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
                                variant="light"
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

                <Row>
                    <Col>
                        <ButtonToolbar>
                            <Button
                                onClick={this.handleSaveData}
                                variant="primary"
                            >
                                Snimi
                            </Button>
                            <Button
                                onClick={this.handleUpdateData}
                                variant="secondary"
                            >
                                Izmeni
                            </Button>
                            <Button
                                onClick={this.handleCopyData}
                                variant="warning"
                            >
                                Kopiraj
                            </Button>
                            <Button
                                onClick={this.handleExportToExcel}
                                variant="success"
                            >
                                Prebaci u XLS
                            </Button>
                            <Button onClick={this.handleExit} variant="danger">
                                Izadji
                            </Button>
                        </ButtonToolbar>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default SingleCallsView;
