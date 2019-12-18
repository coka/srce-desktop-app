import React, { Component } from 'react';
import CalendarNew from './Calendar';
import { format } from 'date-fns';
import { IoMdList } from 'react-icons/io';

const itemsTestList = [
    {
        id: 1,
        time: '19/12/2019',
        duration: 51,
        person: 'Joca',
        type: 'Potrebna pomoc',
        risk: 'veliki',
        volonter: 'Stojkovic'
    },
    {
        id: 2,
        time: '20/12/2019',
        duration: 33,
        person: 'Ceca',
        type: 'Potrebna pomoc',
        risk: 'mali',
        volonter: 'Marko'
    },
    {
        id: 3,
        time: '19/12/2019',
        duration: 35,
        person: 'Naca',
        type: 'Hitan slucaj',
        risk: 'srednji',
        volonter: 'Ljilja'
    },
    {
        id: 4,
        time: '19/12/2019',
        duration: 35,
        person: 'Zaca',
        type: 'Hitan slucaj',
        risk: 'srednji',
        volonter: 'Ljilja'
    },
    {
        id: 5,
        time: '18/12/2019',
        duration: 35,
        person: 'Kaca',
        type: 'Hitan slucaj',
        risk: 'srednji',
        volonter: 'Ljilja'
    }
];

class CallsView extends Component {
    constructor(props) {
        super(props);
        this.state={
            items: itemsTestList,
            itemsForDate: []
        }
    }

    handleChangeTableData = date => {
        console.log("callsview date "+ date)
        let itemsByDate = this.state.items.filter(p => {
            return p.time === format(date, 'dd/MM/yyyy').toString();
        });
        this.setState({
            itemsForDate: [...itemsByDate]
        });
    };

    renderTableData() {
        return this.state.itemsForDate.map((item, index) => {
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
            <div>
                <CalendarNew onDateSelect={date =>this.handleChangeTableData(date)}/>
                <div className="row mr-0">
                    <div className="col-1"></div>
                    <div className="col-10">
                    <h4 className="text-center bg-dirty-green  mt-3">
                        &nbsp;Lista poziva
                    </h4>
                    {this.state.items.length > 0 ? (
                        <table striped hover className="call-data table">
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
                        </table>
                    ) : (
                        <p className="text-center ">
                            Nema poziva na izabrani datum.
                        </p>
                    )}
                </div>
                </div>
            </div>
        );
    }
}
export default CallsView;
