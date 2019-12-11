import React, { useState, useEffect } from 'react';
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

import { ExportToCsv } from 'export-to-csv';
import { format } from 'date-fns';

import fetchVolunteerNames from '../../redux/actions/fetchVolunteerNames';
import { useDispatch, useSelector } from 'react-redux';

const localizedCallColumns = {
    call_id: 'ID poziva',
    date: 'Datum',
    duration: 'Trajanje',
    person: 'Osoba',
    type: 'Tip',
    risk: 'Rizik',
    volunteer: 'Volonter'
};

const SingleCallsView = () => {
    const [state, setState] = useState({
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
    });

    const dispatch = useDispatch();
    const names = useSelector(state => state.volunteers.names);

    useEffect(() => {
         dispatch(fetchVolunteerNames())
    }, [dispatch]);

const handleChangeInput = event => {
    const target = event.target;
    const value =
        target.type === 'text' || target.type === 'textarea'
            ? target.value
            : target.textContent;
    const name = target.name;

    setState({...state, [name]: value});
};

// Buttons
const handleSaveData = () => {
    console.log('Save');
};

const handleUpdateData = () => {
    console.log('Update');
};

const handleCopyData = () => {
    console.log('Copy');
};

const handleExportToExcel = () => {
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

const handleExit = () => {
    console.log('Exit');
};

return (
    <Container>
        <Row>
            <Col>
                <Form>
                    <Form.Text className="text-muted">Poziv</Form.Text>

                    <Form.Group controlId="formBasicCallNo">
                        <Form.Label>Redni broj poziva</Form.Label>
                        <Form.Control
                            onChange={handleChangeInput}
                            type="text"
                            placeholder="Unesite redni broj poziva"
                            name="callNo"
                        />
                    </Form.Group>

                    <DropdownButton
                        variant="light"
                        id="dropdown-basic-button"
                        title={state.contactType}
                    >
                        <Dropdown.Item
                            name="contactType"
                            onClick={handleChangeInput}
                        >
                            Vrsta1
                        </Dropdown.Item>
                        <Dropdown.Item
                            name="contactType"
                            onClick={handleChangeInput}
                        >
                            Vrsta2
                        </Dropdown.Item>
                        <Dropdown.Item
                            name="contactType"
                            onClick={handleChangeInput}
                        >
                            Vrsta3
                        </Dropdown.Item>
                    </DropdownButton>

                    <Form.Group controlId="formBasicCallDate">
                        <Form.Label>Datum poziva</Form.Label>
                        <Form.Control
                            onChange={handleChangeInput}
                            type="text"
                            placeholder="Unesite datum poziva"
                            name="callDate"
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicDay">
                        <Form.Label>Dan</Form.Label>
                        <Form.Control
                            onChange={handleChangeInput}
                            type="text"
                            placeholder="Unesite dan"
                            name="callDay"
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicCallTime">
                        <Form.Label>Vreme poziva</Form.Label>
                        <Form.Control
                            onChange={handleChangeInput}
                            type="text"
                            placeholder="Unesite vreme poziva"
                            name="callTime"
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicCallDuration">
                        <Form.Label>Trajanje poziva</Form.Label>
                        <Form.Control
                            onChange={handleChangeInput}
                            type="text"
                            placeholder="Unesite trajanje poziva"
                            name="callDur"
                        />
                    </Form.Group>

                    <DropdownButton
                        variant="light"
                        id="dropdown-basic-button"
                        title={state.callType}
                    >
                        <Dropdown.Item
                            name="callType"
                            onClick={() => () => handleChangeInput}
                        >
                            Vrsta1
                        </Dropdown.Item>
                        <Dropdown.Item
                            name="callType"
                            onClick={handleChangeInput}
                        >
                            Vrsta2
                        </Dropdown.Item>
                        <Dropdown.Item
                            name="callType"
                            onClick={handleChangeInput}
                        >
                            Vrsta3
                        </Dropdown.Item>
                    </DropdownButton>
                </Form>
            </Col>

            <Col>
                <Form>
                    <Form.Text className="text-muted">Pozivar</Form.Text>

                    <Form.Group controlId="formBasicName">
                        <Form.Label>Ime ili nadimak</Form.Label>
                        <Form.Control
                            onChange={handleChangeInput}
                            type="text"
                            placeholder="Unesite ime ili nadimak"
                            name="callName"
                        />
                    </Form.Group>

                    <DropdownButton
                        variant="light"
                        id="dropdown-basic-button"
                        title={state.gender}
                    >
                        <Dropdown.Item
                            name="gender"
                            onClick={handleChangeInput}
                        >
                            Pol1
                        </Dropdown.Item>
                        <Dropdown.Item
                            name="gender"
                            onClick={handleChangeInput}
                        >
                            Pol2
                        </Dropdown.Item>
                        <Dropdown.Item
                            name="gender"
                            onClick={handleChangeInput}
                        >
                            Pol3
                        </Dropdown.Item>
                    </DropdownButton>

                    <DropdownButton
                        variant="light"
                        id="dropdown-basic-button"
                        title={state.age}
                    >
                        <Dropdown.Item
                            name="age"
                            onClick={handleChangeInput}
                        >
                            St1
                        </Dropdown.Item>
                        <Dropdown.Item
                            name="age"
                            onClick={handleChangeInput}
                        >
                            St2
                        </Dropdown.Item>
                        <Dropdown.Item
                            name="age"
                            onClick={handleChangeInput}
                        >
                            St3
                        </Dropdown.Item>
                    </DropdownButton>

                    <DropdownButton
                        variant="light"
                        id="dropdown-basic-button"
                        title={state.maritalStatus}
                    >
                        <Dropdown.Item
                            name="maritalStatus"
                            onClick={handleChangeInput}
                        >
                            Bs1
                        </Dropdown.Item>
                        <Dropdown.Item
                            name="maritalStatus"
                            onClick={handleChangeInput}
                        >
                            Bs2
                        </Dropdown.Item>
                        <Dropdown.Item
                            name="maritalStatus"
                            onClick={handleChangeInput}
                        >
                            Bs3
                        </Dropdown.Item>
                    </DropdownButton>

                    <DropdownButton
                        variant="light"
                        id="dropdown-basic-button"
                        title={state.numOfCall}
                    >
                        <Dropdown.Item
                            name="numOfCall"
                            onClick={handleChangeInput}
                        >
                            Prvi
                        </Dropdown.Item>
                        <Dropdown.Item
                            name="numOfCall"
                            onClick={handleChangeInput}
                        >
                            Drugi
                        </Dropdown.Item>
                        <Dropdown.Item
                            name="numOfCall"
                            onClick={handleChangeInput}
                        >
                            Treci
                        </Dropdown.Item>
                    </DropdownButton>

                    <DropdownButton
                        variant="light"
                        id="dropdown-basic-button"
                        title={state.planInvolvement}
                    >
                        <Dropdown.Item
                            name="planInvolvement"
                            onClick={handleChangeInput}
                        >
                            Plan1
                        </Dropdown.Item>
                        <Dropdown.Item
                            name="planInvolvement"
                            onClick={handleChangeInput}
                        >
                            Plan2
                        </Dropdown.Item>
                        <Dropdown.Item
                            name="planInvolvement"
                            onClick={handleChangeInput}
                        >
                            Plan3
                        </Dropdown.Item>
                    </DropdownButton>

                    <DropdownButton
                        variant="light"
                        id="dropdown-basic-button"
                        title={state.selectedVolunteer}
                    >
                        {names.map((v, i) => {
                            return (
                                <Dropdown.Item
                                    key={i}
                                    name="selectedVolunteer"
                                    onClick={handleChangeInput}
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
                    <Form.Text className="text-muted">Opis razgovora</Form.Text>

                    <DropdownButton
                        variant="light"
                        id="dropdown-basic-button"
                        title={state.problemType}
                    >
                        <Dropdown.Item
                            name="problemType"
                            onClick={handleChangeInput}
                        >
                            Prob1
                        </Dropdown.Item>
                        <Dropdown.Item
                            name="problemType"
                            onClick={handleChangeInput}
                        >
                            Prob2
                        </Dropdown.Item>
                        <Dropdown.Item
                            name="problemType"
                            onClick={handleChangeInput}
                        >
                            Prob3
                        </Dropdown.Item>
                    </DropdownButton>

                    <DropdownButton
                        variant="light"
                        id="dropdown-basic-button"
                        title={state.suicidRisk}
                    >
                        <Dropdown.Item
                            name="suicidRisk"
                            onClick={handleChangeInput}
                        >
                            s1
                        </Dropdown.Item>
                        <Dropdown.Item
                            name="suicidRisk"
                            onClick={handleChangeInput}
                        >
                            s2
                        </Dropdown.Item>
                        <Dropdown.Item
                            name="suicidRisk"
                            onClick={handleChangeInput}
                        >
                            s3
                        </Dropdown.Item>
                    </DropdownButton>

                    <DropdownButton
                        variant="light"
                        id="dropdown-basic-button"
                        title={state.suicidFactor}
                    >
                        <Dropdown.Item
                            name="suicidFactor"
                            onClick={handleChangeInput}
                        >
                            sf1
                        </Dropdown.Item>
                        <Dropdown.Item
                            name="suicidFactor"
                            onClick={handleChangeInput}
                        >
                            sf2
                        </Dropdown.Item>
                        <Dropdown.Item
                            name="suicidFactor"
                            onClick={handleChangeInput}
                        >
                            sf3
                        </Dropdown.Item>
                    </DropdownButton>

                    <DropdownButton
                        variant="light"
                        id="dropdown-basic-button"
                        title={state.lastSuicidTry}
                    >
                        <Dropdown.Item
                            name="lastSuicidTry"
                            onClick={handleChangeInput}
                        >
                            p1
                        </Dropdown.Item>
                        <Dropdown.Item
                            name="lastSuicidTry"
                            onClick={handleChangeInput}
                        >
                            p2
                        </Dropdown.Item>
                        <Dropdown.Item
                            name="lastSuicidTry"
                            onClick={handleChangeInput}
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
                            onChange={handleChangeInput}
                            name="shortContent"
                        />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlNote">
                        <Form.Label>Napomena</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows="3"
                            onChange={handleChangeInput}
                            name="note"
                        />
                    </Form.Group>
                </Form>
            </Col>
        </Row>

        <Row>
            <Col>
                <ButtonToolbar>
                    <Button onClick={handleSaveData} variant="primary">
                        Snimi
                    </Button>
                    <Button onClick={handleUpdateData} variant="secondary">
                        Izmeni
                    </Button>
                    <Button onClick={handleCopyData} variant="warning">
                        Kopiraj
                    </Button>
                    <Button onClick={handleExportToExcel} variant="success">
                        Prebaci u CSV
                    </Button>
                    <Button onClick={handleExit} variant="danger">
                        Izadji
                    </Button>
                </ButtonToolbar>
            </Col>
        </Row>
    </Container>
)
};

export default SingleCallsView;
