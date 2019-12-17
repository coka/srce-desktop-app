import React from 'react';
import Calendar from 'react-calendar';
// import Calendar from 'react-calendar/dist/entry.nostyle';

class CalendarNew extends React.Component{
    state = {
        date: new Date(),
    }
    // this.setState({
    //     dateSelected:{[day.dateString]:{selected: true, selectedColor: '#466A8F'}}
    //     },() => {
    //     console.log(this.state.dateSelected)
    //     })
    onChange = date => this.setState({ date })

    render(){
        return(
            <div>
                <div className="row pt-3 m-3">
                    <div className="col-3"></div>
                        <button className="btn btn-dark-green col-2 m-1">
                            Detalji poziva
                        </button>
                        <button className="btn btn-dark-green col-2 m-1">
                            Unos poziva
                        </button>
                        <button className="btn btn-dark-green col-2 m-1">
                            Brisanje poziva
                        </button>
                </div>
                <div style={{borderBottom: "3px solid rgb(212, 212, 212)"}}></div>
                <div className="row">
                    <div className="col-1"></div>
                    <Calendar
                        tileClassName="calendar-tile"
                        className={['c1','c2', 'col-10','mt-4']}
                        onChange={this.onChange}
                        value={this.state.date}
                        selectedColor= '#BFD630'
                        />
                </div>
                <div style={{borderBottom: "3px solid rgb(212, 212, 212)"}}></div>
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10">
                    <h4 className="text-center bg-dirty-green  mt-3">
                        &nbsp;Lista poziva
                    </h4>
                         {/* {this.state.items.length > 0 ? (
                            <table striped hover className="call-data">
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
                            <p className="text-center call-data-msg">
                                Nema poziva na izabrani datum.
                            </p>
                        )} */}
                        </div>
                </div>
        </div>
        )
    }
}

export default CalendarNew;
