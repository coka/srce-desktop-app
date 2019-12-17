import React, { Component } from 'react';
import {
    Dropdown,
    DropdownButton,
    ButtonToolbar,
    Table,
    Row,
    Col
} from 'react-bootstrap';
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
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

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

const numberOfPastYears = 20;

class Calendar extends Component {
    state = {
        selectedDate: new Date()
    };

    componentDidMount() {
        this.props.onDateSelect(this.state.selectedDate);
    }

    handleOnDateClickCurrentMonth = event => {
        const clickedDay = event.target.textContent;

        const { selectedDate } = this.state;

        const newSelectedDate = addDays(
            selectedDate,
            clickedDay - selectedDate.getDate()
        );
        this.setState({
            selectedDate: newSelectedDate
        });
        this.props.onDateSelect(newSelectedDate);
    };

    handleOnDateClickPreviousMonth = event => {
        const clickedDay = event.target.textContent;

        const { selectedDate } = this.state;

        const newSelectedDate = setDate(subMonths(selectedDate, 1), clickedDay);
        this.setState({
            selectedDate: newSelectedDate
        });
        this.props.onDateSelect(newSelectedDate);
    };

    handleOnDateClickNextMonth = event => {
        const clickedDay = event.target.textContent;

        const { selectedDate } = this.state;

        const newSelectedDate = setDate(addMonths(selectedDate, 1), clickedDay);
        this.setState({
            selectedDate: newSelectedDate
        });
        this.props.onDateSelect(newSelectedDate);
    };

    handleMonthForward = event => {
        const { selectedDate } = this.state;
        const newSelectedDate = addMonths(selectedDate, 1);
        this.setState({ selectedDate: newSelectedDate });
        this.props.onDateSelect(newSelectedDate);
    };

    handleMonthBackward = event => {
        const { selectedDate } = this.state;
        const newSelectedDate = subMonths(selectedDate, 1);
        this.setState({ selectedDate: newSelectedDate });
        this.props.onDateSelect(newSelectedDate);
    };

    handleChangeInputMonth = event => {
        const { selectedDate } = this.state;
        const newSelectedMonth = event.target.textContent;

        const newSelectedDate = setMonth(
            selectedDate,
            months.indexOf(newSelectedMonth)
        );
        this.setState({
            selectedDate: newSelectedDate
        });
        this.props.onDateSelect(newSelectedDate);
    };

    handleChangeInputYear = event => {
        const { selectedDate } = this.state;
        const newSelectedYear = event.target.textContent;

        const newSelectedDate = setYear(selectedDate, newSelectedYear);
        this.setState({
            selectedDate: newSelectedDate
        });
        this.props.onDateSelect(newSelectedDate);
    };

    render() {
        const { selectedDate } = this.state;
        const numberOfDays = getDaysInMonth(selectedDate);
        const startDay = getDay(startOfMonth(selectedDate));
        const endDay = getDay(endOfMonth(selectedDate));

        const startOfFirstWeek = startOfWeek(startOfMonth(selectedDate), {
            weekStartsOn: 1
        }).getDate();
        const numberOfDaysInPrevouosMonth = getDaysInMonth(
            subMonths(selectedDate, 1)
        );
        const startOfLastWeek = lastDayOfWeek(lastDayOfMonth(selectedDate), {
            weekStartsOn: 1
        }).getDate();

        let prevMonthDays = [];
        let days = [];
        let nextMonthDays = [];

        // Previous
        for (
            let i = startOfFirstWeek;
            i <= numberOfDaysInPrevouosMonth && startDay !== 1;
            i++
        ) {
            prevMonthDays.push(
                <td
                    key={i + 'p'}
                    onClick={this.handleOnDateClickPreviousMonth}
                    className="text-center text-secondary"
                >
                    {i}
                </td>
            );
        }
        // Actual
        const selectedDay = selectedDate.getDate();
        for (let i = 1; i <= numberOfDays; i++) {
            if (i === selectedDay) {
                days.push(
                    <td
                        key={i + 'd'}
                        onClick={this.handleOnDateClickCurrentMonth}
                        className="text-center selected-date"
                    >
                        {i}
                    </td>
                );
            } else {
                days.push(
                    <td
                        key={i + 'd'}
                        onClick={this.handleOnDateClickCurrentMonth}
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
                    key={i + 'n'}
                    onClick={this.handleOnDateClickNextMonth}
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
            return <tr key={d + i} className="col2">{d}</tr>;
        });

        let years = [];
        const currentYear = new Date();
        for (
            let y = currentYear;
            y >= subYears(currentYear, numberOfPastYears);
            y = subYears(y, 1)
        ) {
            years.push(y);
        }

        return (
            <table className="table-borderless calendar" >
                <thead>
                    <tr>
                        <td
                            onClick={this.handleMonthBackward}
                            colSpan="2"
                            className="text-center"
                        >
                            <IoIosArrowBack />
                        </td>
                        <td className="text-center" colSpan="3">
                            <ButtonToolbar>
                                <DropdownButton
                                    title={format(selectedDate, 'MMM')}
                                    size="sm"
                                    variant="outline-dark"
                                >
                                    {months.map((m, i) => {
                                        return (
                                            <Dropdown.Item
                                                key={m + i}
                                                onClick={
                                                    this.handleChangeInputMonth
                                                }
                                                active={
                                                    m ===
                                                    format(selectedDate, 'MMM')
                                                }
                                            >
                                                {m}
                                            </Dropdown.Item>
                                        );
                                    })}
                                </DropdownButton>
                                <DropdownButton
                                    title={format(selectedDate, 'yyyy')}
                                    size="sm"
                                    variant="outline-dark"
                                >
                                    {years.map((y, i) => {
                                        return (
                                            <Dropdown.Item
                                                key={y + i}
                                                onClick={
                                                    this.handleChangeInputYear
                                                }
                                                active={
                                                    format(y, 'yyyy') ===
                                                    format(selectedDate, 'yyyy')
                                                }
                                            >
                                                {y.getFullYear()}
                                            </Dropdown.Item>
                                        );
                                    })}
                                </DropdownButton>
                            </ButtonToolbar>
                        </td>
                        <td
                            onClick={this.handleMonthForward}
                            colSpan="2"
                            className="text-center"
                        >
                            <IoIosArrowForward />
                        </td>
                    </tr>
                    <tr className="text-center">
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
