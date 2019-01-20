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

const Schedule = () => import('./pages/Schedule');
const Messages = () => import('./pages/Messages');
const Notifications = () => import('./pages/Notifications');
const Policies = () => import('./pages/Policies');
const Duties = () => import('./pages/Duties');
const ChangeAvailability = () => import('./pages/ChangeAvailability');
const RequestTimeOff = () => import('./pages/RequestTimeOff');

const DevTools = () => import('./pages/DevTools');

const Employees = () => import('./managerPages/Employees');
const Shifts = () => import('./managerPages/Shifts');
const PendingRequests = () => import('./managerPages/PendingRequests');

interface PageRoute {
    path: string;
    componentFactory: () => Promise<{ default: React.ComponentType<any>; }>;
    name: string;
}

export const routes: PageRoute[] = [
    {
        path: '/schedule',
        componentFactory: Schedule,
        name: 'Schedule',
    },
    {
        path: '/messages',
        componentFactory: Messages,
        name: 'Messages',
    },
    {
        path: '/notifications',
        componentFactory: Notifications,
        name: 'Notifications',
    },
    {
        path: '/change-availability',
        componentFactory: ChangeAvailability,
        name: 'Change Availability',
    },
    {
        path: '/request-time-off',
        componentFactory: RequestTimeOff,
        name: 'Request Time Off',
    },
    {
        path: '/policies',
        componentFactory: Policies,
        name: 'Policies',
    },
    {
        path: '/duties',
        componentFactory: Duties,
        name: 'Duties',
    },
    {
        path: '/dev-tools',
        componentFactory: DevTools,
        name: 'Dev Tools',
    }
];

export const managerRoutes: PageRoute[] = [
    {
        path: '/employees',
        componentFactory: Employees,
        name: 'Employees',
    },
    {
        path: '/shifts',
        componentFactory: Shifts,
        name: 'Shifts',
    },
    {
        path: '/pending-requests',
        componentFactory: PendingRequests,
        name: 'PendingRequests',
    },
];