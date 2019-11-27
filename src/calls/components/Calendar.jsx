import React, { Component } from 'react';
import {
    startOfMonth,
    getDaysInMonth,
    getDay,
    format,
    addMonths,
    subMonths,
    addDays,
    setMonth,
    setDate,
    setYear,
    startOfWeek,
    lastDayOfWeek,
    lastDayOfMonth,
    endOfMonth,
    subYears
} from 'date-fns';

const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Maj',
    'Jun',
    'Jul',
    'Avg',
    'Sep',
    'Okt',
    'Nov',
    'Dec'
];

class Calendar extends Component {
    state = {
        selectedDate: new Date()
    };

    componentDidMount() {
        this.props.onDateSelect(this.state.selectedDate);
    }

    handleOnDateClick = event => {
        const clickedDay = event.target.textContent;

        const type = event.target.getAttribute('type');
        const { selectedDate } = this.state;

        if (type === 'prev') {
            this.setState(
                {
                    selectedDate: setDate(
                        subMonths(selectedDate, 1),
                        clickedDay
                    )
                },
                () => this.props.onDateSelect(this.state.selectedDate)
            );
        } else if (type === 'next') {
            this.setState(
                {
                    selectedDate: setDate(
                        addMonths(selectedDate, 1),
                        clickedDay
                    )
                },
                () => this.props.onDateSelect(this.state.selectedDate)
            );
        } else {
            this.setState(
                {
                    selectedDate: addDays(
                        selectedDate,
                        clickedDay - selectedDate.getDate()
                    )
                },
                () => this.props.onDateSelect(this.state.selectedDate)
            );
        }
    };

    handleMonthForward = event => {
        const { selectedDate } = this.state;
        this.setState({ selectedDate: addMonths(selectedDate, 1) }, () =>
            this.props.onDateSelect(this.state.selectedDate)
        );
    };

    handleMonthBackward = event => {
        const { selectedDate } = this.state;
        this.setState({ selectedDate: subMonths(selectedDate, 1) }, () =>
            this.props.onDateSelect(this.state.selectedDate)
        );
    };

    handleChangeDate = event => {
        const option = event.target.textContent;
        const { selectedDate } = this.state;

        if (!parseInt(option)) {
            this.setState(
                {
                    selectedDate: setMonth(selectedDate, months.indexOf(option))
                },
                () => this.props.onDateSelect(this.state.selectedDate)
            );
        } else {
            this.setState(
                {
                    selectedDate: setYear(selectedDate, option)
                },
                () => this.props.onDateSelect(this.state.selectedDate)
            );
        }
    };

    render() {
        const numOfDays = getDaysInMonth(this.state.selectedDate);
        const startDay = getDay(startOfMonth(this.state.selectedDate));
        const endDay = getDay(endOfMonth(this.state.selectedDate));

        const startOfFirstWeek = startOfWeek(
            startOfMonth(this.state.selectedDate),
            {
                weekStartsOn: 1
            }
        ).getDate();
        const numOfDaysInPrevouosMonth = getDaysInMonth(
            subMonths(this.state.selectedDate, 1)
        );
        const startOfLastWeek = lastDayOfWeek(
            lastDayOfMonth(this.state.selectedDate),
            {
                weekStartsOn: 1
            }
        ).getDate();

        let prevMonthDays = [];
        let days = [];
        let nextMonthDays = [];

        // Previous
        for (
            let i = startOfFirstWeek;
            i <= numOfDaysInPrevouosMonth && startDay !== 1;
            i++
        ) {
            prevMonthDays.push(
                <td
                    type="prev"
                    key={i + 'p'}
                    onClick={this.handleOnDateClick}
                    className="text-center text-secondary"
                >
                    {i}
                </td>
            );
        }
        // Actual
        const selectedDay = this.state.selectedDate.getDate();
        for (let i = 1; i <= numOfDays; i++) {
            if (i === selectedDay) {
                days.push(
                    <td
                        key={i + 'd'}
                        onClick={this.handleOnDateClick}
                        className="text-center btn-success"
                    >
                        {i}
                    </td>
                );
            } else {
                days.push(
                    <td
                        key={i + 'd'}
                        onClick={this.handleOnDateClick}
                        className="text-center"
                    >
                        {i}
                    </td>
                );
            }
        }
        // Next
        for (let i = 1; i <= startOfLastWeek && endDay > 0; i++) {
            nextMonthDays.push(
                <td
                    type="next"
                    key={i + 'n'}
                    onClick={this.handleOnDateClick}
                    className="text-center text-secondary"
                >
                    {i}
                </td>
            );
        }

        const total = [...prevMonthDays, ...days, ...nextMonthDays];

        let rows = [];

        for (let i = 0; i < total.length; i += 7) {
            rows.push(total.slice(i, i + 7));
        }

        const daysInMonth = rows.map((d, i) => {
            return <tr key={d + i}>{d}</tr>;
        });

        const { selectedDate } = this.state;

        let years = [];
        const currentYear = new Date();
        for (
            let y = currentYear;
            y > subYears(currentYear, 20);
            y = subYears(y, 1)
        ) {
            years.push(y);
        }

        return (
            <table className="table-condensed table-bordered table-striped">
                <thead>
                    <tr>
                        <td className="text-center" colSpan="7">
                            {format(selectedDate, 'dd')}

                            <div className="btn-group">
                                <button
                                    className="btn btn-secondary btn-sm dropdown-toggle"
                                    type="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    {format(selectedDate, 'MMM')}
                                </button>
                                <div className="dropdown-menu">
                                    {months.map((m, i) => {
                                        return (
                                            <button
                                                key={m + i}
                                                onClick={this.handleChangeDate}
                                                className="dropdown-item"
                                                type="button"
                                            >
                                                {m}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="btn-group">
                                <button
                                    className="btn btn-secondary btn-sm dropdown-toggle"
                                    type="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    {format(selectedDate, 'yyyy')}
                                </button>
                                <div className="dropdown-menu">
                                    {years.map((y, i) => {
                                        return (
                                            <button
                                                key={y + i}
                                                onClick={this.handleChangeDate}
                                                className="dropdown-item"
                                                type="button"
                                            >
                                                {y.getFullYear()}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td
                            className="text-center"
                            colSpan="4"
                            onClick={this.handleMonthBackward}
                        >
                            -
                        </td>
                        <td
                            className="text-center"
                            colSpan="3"
                            onClick={this.handleMonthForward}
                        >
                            +
                        </td>
                    </tr>
                    <tr>
                        <th>PON</th>
                        <th>UTO</th>
                        <th>SRE</th>
                        <th>ČET</th>
                        <th>PET</th>
                        <th>SUB</th>
                        <th>NED</th>
                    </tr>
                </thead>
                <tbody>{daysInMonth}</tbody>
            </table>
        );
    }
}

export default Calendar;
