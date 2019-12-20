import React, { Component } from 'react';
import Calendar from './Calendar';
import {
    Container,
    Row,
    Col,
    Button,
    Table,
    ButtonGroup
} from 'react-bootstrap';
import { format } from 'date-fns';
import { IoMdList } from 'react-icons/io';

class CallsView extends Component {
    constructor(props) {
        super(props);

        let items = [
            {
                id: 1,
                time: '12/11/2201',
                duration: 51,
                person: 'Joca',
                type: 'Potrebna pomoc',
                risk: 'veliki',
                volonter: 'Stojkovic'
            },
            {
                id: 2,
                time: '12/11/2051',
                duration: 33,
                person: 'Ceca',
                type: 'Potrebna pomoc',
                risk: 'mali',
                volonter: 'Marko'
            },
            {
                id: 3,
                time: '12/11/2011',
                duration: 35,
                person: 'Naca',
                type: 'Hitan slucaj',
                risk: 'srednji',
                volonter: 'Ljilja'
            },
            {
                id: 4,
                time: '12/11/2031',
                duration: 35,
                person: 'Zaca',
                type: 'Hitan slucaj',
                risk: 'srednji',
                volonter: 'Ljilja'
            },
            {
                id: 5,
                time: '24/11/2019',
                duration: 35,
                person: 'Kaca',
                type: 'Hitan slucaj',
                risk: 'srednji',
                volonter: 'Ljilja'
            }
        ];

        this.state.initialItems = items;
      //  this.state ={name: "calls"}
    }
    state = {
        initialItems: [],
        items: []
    };

    handleChangeTableData = date => {
        let items = this.state.initialItems;
        let itemsByDate = items.filter(p => {
            return p.time === format(date, 'dd/MM/yyyy').toString();
        });
        this.setState({
            items: [...itemsByDate]
        });
    };
    renderTableData() {
        return this.state.items.map((item, index) => {
            const { id, time, duration, person, type, risk, volonter } = item; //destructuring
            return (
                <tr className="text-center" key={id}>
                    <td>{id}</td>
                    <td>{time}</td>
                    <td>{duration}</td>
                    <td>{person}</td>
                    <td>{type}</td>
                    <td>{risk}</td>
                    <td>{volonter} </td>
                </tr>
            );
        });
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <ButtonGroup className="call-actions-menu" vertical size="sm">
                            <Button variant="outline-dark">
                                Detalji poziva
                            </Button>

                            <br></br>

                            <Button variant="outline-success">
                                Unos poziva
                            </Button>
                            <Button variant="outline-danger">
                                Brisanje poziva
                            </Button>
                        </ButtonGroup>
                    </Col>
                    <Col>
                        <Calendar
                            onDateSelect={date =>
                                this.handleChangeTableData(date)
                            }
                        />
                        <br></br>

                        <h3 className="text-center bg-warning call-data-header">
                            <IoMdList />
                            &nbsp;Lista poziva
                        </h3>
                        {this.state.items.length > 0 ? (
                            <Table striped hover className="call-data">
                                <thead className="bg-light">
                                    <tr className="text-center">
                                        <th>ID</th>
                                        <th>Vreme</th>
                                        <th>Trajanje</th>
                                        <th>Pozivar</th>
                                        <th>Vrsta poziva</th>
                                        <th>Suic. rizik</th>
                                        <th>Volonter</th>
                                    </tr>
                                </thead>
                                <tbody>{this.renderTableData()}</tbody>
                            </Table>
                        ) : (
                            <p className="text-center call-data-msg">
                                Nema poziva na izabrani datum.
                            </p>
                        )}
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default CallsView;
