import React from 'react';
import Calendar from 'react-calendar';

class CalendarView extends React.Component{
    state = {
        date: new Date(),
    }
    
    onChange = date => {
        this.setState({ date });
        console.log(date)
        this.props.onDateSelect(date);
    }

    componentDidMount() {
        this.props.onDateSelect(this.state.date);
    }

    render(){
        return(
            <div>
                <div className="row pt-3 m-3 mr-0">
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
                <div className="row mr-0">
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
        </div>
        )
    }
}

export default CalendarView;
