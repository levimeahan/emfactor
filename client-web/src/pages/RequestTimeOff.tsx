import React, {useState} from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import {actions, selectors, TimeOffRequest} from 'emfactor-client-core';

import DateRangePicker from '../components/Form/DateRangePicker';

import pageStyles from '../styles/page';
import useAppState from "../hooks/useAppState";
import moment from 'moment';

// Index component
const RequestTimeOff = () => {
    const state = useAppState();

    return <div data-testid="requestTimeOffPage" className={css(pageStyles.container, styles.rtoContainer)}>
        <h2 className={css(pageStyles.header, styles.header)}>Request Time Off</h2>
        <NewTimeOffRequest employeeId={state.app.userEmployeeId}/>

        <h2 className={css(pageStyles.header, styles.header)}>Your Requests</h2>
        <EmployeeTimeOffRequests requests={selectors.employeeTimeOffRequests(state, state.app.userEmployeeId)} />
    </div>;
};

// New Request
const NewTimeOffRequest = ({employeeId}) => {
    const [dates, setDates] = useState({startDate: null, endDate: null});

    const submitRequest = () => actions.requestTimeOff(
        employeeId,
        dates.startDate.toDate(),
        dates.endDate.toDate(),
        () => setDates({startDate: null, endDate: null})
    );

    return <div>
        <DateRangePicker
            dates={dates}
            setDates={setDates}
        />
        <button className={css(styles.submitButton)} onClick={submitRequest}>Submit Request</button>
    </div>
};

// View Requests
interface EmployeeTimeOffRequestsProps {
    requests: TimeOffRequest[]
}
const EmployeeTimeOffRequests = ({ requests }: EmployeeTimeOffRequestsProps) => {
    if (requests.length < 1) {
        return <div>No existing requests!</div>
    }

    return <div>
        {requests.map((request, i) => (
            <div key={i} className={css(styles.request)}>
                <span>{formatDate(request.startDate)} -> {formatDate(request.endDate)}</span>
                <span>Status: {getRequestStatus(request)}</span>
            </div>
        ))}
    </div>
};

// Utils
const formatDate = date => moment(date).format('dddd, MMMM D, YYYY');

const getRequestStatus = (request: TimeOffRequest) => {
    if (!request.finalized) {
        return "Pending";
    }

    return request.approved ? "Approved" : "Declined";
};

// Styles
const styles = StyleSheet.create({
    rtoContainer: {},
    header: {
        textAlign: 'left',
        marginBottom: '15px',
    },
    submitButton: {
        marginTop: '10px',
    },
    request: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
});

// Export
export default RequestTimeOff;