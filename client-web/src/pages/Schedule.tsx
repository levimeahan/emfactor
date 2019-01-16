import React from 'react';

import { Shift, Days } from 'emfactor-client-core';

const shifts: Shift[] = [
    {
        id: 1,
        dayOfTheWeek: 1,
        name: 'Swing',
        startTime: 0,
        endTime: 0,
        allowedRoles: [],
    },
    {
        id: 1,
        dayOfTheWeek: 2,
        name: 'Swing',
        startTime: 0,
        endTime: 0,
        allowedRoles: [],
    },
    {
        id: 1,
        dayOfTheWeek: 3,
        name: 'Swing',
        startTime: 0,
        endTime: 0,
        allowedRoles: [],
    }
];

const Schedule = () => {

    return <div>
        {Object.keys(Days).map((dayKey, i) => {
            return <span key={i}>{dayKey}{Days[dayKey]}</span>;
        })}
    </div>;
};

export default Schedule;