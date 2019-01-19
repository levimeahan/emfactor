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

const Schedule = React.lazy(() => import('./pages/Schedule'));
const Messages = React.lazy(() => import('./pages/Messages'));
const Notifications = React.lazy(() => import('./pages/Notifications'));
const Policies = React.lazy(() => import('./pages/Policies'));
const Duties = React.lazy(() => import('./pages/Duties'));
const ChangeAvailability = React.lazy(() => import('./pages/ChangeAvailability'));
const RequestTimeOff = React.lazy(() => import('./pages/RequestTimeOff'));

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