import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import { selectors } from 'emfactor-client-core';
import useAppState from "../hooks/useAppState";

import pageStyles from '../styles/page';

import TimeOffRequest from '../components/PendingRequests/TimeOffRequest';

const PendingRequests = () => {
    const state = useAppState();

    const timeOffRequests = selectors.allTimeOffRequests(state);
    const employeeNames = selectors.employeeNamesByIds(
        state, timeOffRequests.map(request => request.employeeId)
    );

    return <div data-testid="managePendingRequestsPage" className={css(pageStyles.container)}>
        <h2 className={css(pageStyles.header)}>Pending Requests</h2>
        {timeOffRequests.length > 0 ?
            <TimeOffRequestsList
                requests={timeOffRequests}
                employeeNames={employeeNames}
            />
        : null}
    </div>;
};

const TimeOffRequestsList = ({ requests, employeeNames }) => (
    <div className={css(styles.requestList)}>
        <h3 className={css(pageStyles.header2)}>Time Off</h3>
        {requests.map((request, i) => (
            <TimeOffRequest
                key={i}
                id={request.id}
                employeeId={request.employeeId}
                employeeName={employeeNames[request.employeeId]}
                startDate={request.startDate}
                endDate={request.endDate}
                reason={request.reason}
                approved={request.approved}
                finalized={request.finalized}
                finalizedBy={request.finalizedBy}
                finalizedTime={request.finalizedTime}
            />
        ))}
    </div>
);


const styles = StyleSheet.create({
    requestList: {
        textAlign: 'left',
        alignSelf: 'stretch',
    }
});

export default PendingRequests;