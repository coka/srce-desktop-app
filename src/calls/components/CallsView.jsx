import React, { Component } from 'react';
import Calendar from './Calendar';
import { format } from 'date-fns';

class CallsView extends Component {
    state = {
        initialItems: [],
        items: []
    };

    componentDidMount = () => {
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
        this.setState({ initialItems: items });
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
                <tr key={id}>
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
            <div className="container-fluid col-lg-12">
                <div className="col-lg-2 d-inline-block button-group">
                    <button
                        type="button"
                        className="btn btn-primary d-inline-block btn-sm"
                    >
                        Add
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger d-inline-block btn-sm"
                    >
                        Delete
                    </button>
                    <button
                        type="button"
                        className="btn btn-success d-inline-block btn-sm"
                    >
                        Details
                    </button>
                </div>

                <div className="col-lg-6 d-inline-block">
                    <span>Kalendar</span>
                    <Calendar
                        onDateSelect={date => this.handleChangeTableData(date)}
                    />
                </div>
                <div className="col-lg-12 placeHold tableFixHead">
                    <table className="table tableCalls table-striped header-fixed">
                        <thead>
                            <tr>
                                <th scope="col"> ID </th>
                                <th scope="col">Vreme</th>
                                <th scope="col">Trajanje</th>
                                <th scope="col">Pozivar</th>
                                <th scope="col">Vrsta poziva</th>
                                <th scope="col">Suic. rizik</th>
                                <th scope="col">Volonter</th>
                            </tr>
                        </thead>
                        <tbody>{this.renderTableData()}</tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default CallsView;
