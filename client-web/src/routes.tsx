import React from 'react';

/*

EMPLOYEE PAGES

Messages
Notifications
Policies
Guides/Guides
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

Roles
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
const Guides = () => import('./pages/Guides');
const ChangeAvailability = () => import('./pages/ChangeAvailability');
const RequestTimeOff = () => import('./pages/RequestTimeOff');

const DevTools = () => import('./pages/DevTools');

const ManageEmployees = () => import('./managerPages/Employees');
const ManageShifts = () => import('./managerPages/Shifts');
const ManageSchedules = () => import('./managerPages/Schedules');
const ManagePendingRequests = () => import('./managerPages/PendingRequests');
const ManageRoles = () => import('./managerPages/Roles');

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
        path: '/guides',
        componentFactory: Guides,
        name: 'Guides',
    },
    {
        path: '/dev-tools',
        componentFactory: DevTools,
        name: 'Dev Tools',
    }
];

export const managerRoutes: PageRoute[] = [
    {
        path: '/pending-requests',
        componentFactory: ManagePendingRequests,
        name: 'Pending Requests',
    },
    {
        path: '/schedules',
        componentFactory: ManageSchedules,
        name: 'Schedules',
    },
    {
        path: '/shifts',
        componentFactory: ManageShifts,
        name: 'Shifts',
    },
    {
        path: '/employees',
        componentFactory: ManageEmployees,
        name: 'Employees',
    },
    {
        path: '/roles',
        componentFactory: ManageRoles,
        name: 'Roles',
    },
];