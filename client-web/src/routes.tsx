import React from 'react';

/*

EMPLOYEE PAGES

Messages
Notifications
Policies
Duties/Guides
Schedule
Change Availability
Request Time Off
*/

/*

MANAGER PAGES

Employees
* add new
* edit existing
* add warnings or commendations to employee record

Shifts
* Add new
* Edit existing

Schedules
* Create future schedules
* Edit current schedules

Pending Requests
* Time Off
* Shift swap
* Availability Change



*/


const Messages = () => ( <h2>Messages</h2> );
const Notifications = () => ( <h2>Notifications</h2> );
const Policies = () => ( <h2>Policies</h2> );
const Duties = () => ( <h2>Duties</h2> );
const Schedule = () => ( <h2>Schedule</h2> );
const ChangeAvailability = () => ( <h2>ChangeAvailability</h2> );
const RequestTimeOff = () => ( <h2>RequestTimeOff</h2> );

export const routes = [
    {
        path: '/schedule',
        component: Schedule,
        name: 'Schedule',
    },
    {
        path: '/messages',
        component: Messages,
        name: 'Messages',
    },
    {
        path: '/notifications',
        component: Notifications,
        name: 'Notifications',
    },
    {
        path: '/change-availability',
        component: ChangeAvailability,
        name: 'Change Availability',
    },
    {
        path: '/request-time-off',
        component: RequestTimeOff,
        name: 'Request Time Off',
    },
    {
        path: '/policies',
        component: Policies,
        name: 'Policies',
    },
    {
        path: '/duties',
        component: Duties,
        name: 'Duties',
    },
];