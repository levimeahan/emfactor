import spreadShiftsToRows from '../spreadShiftsToRows';

it('keeps subsequent shifts on the same row', () => {
    let shift1 = { startHour: 1, endHour: 3 },
        shift2 = { startHour: 3, endHour: 6 },
        shift3 = { startHour: 7, endHour: 9 };

    let shifts = [shift1, shift2, shift3];

    let rows = spreadShiftsToRows(shifts);

    expect(rows).toEqual([
        [shift1, shift2, shift3]
    ]);
});

it('separates concurrent shifts to different rows', () => {
    let shift1 = { startHour: 1, endHour: 3 },
        shift2 = { startHour: 2, endHour: 6 },
        shift3 = { startHour: 7, endHour: 9 },
        shift4 = { startHour: 2, endHour: 9 };

    let shifts = [shift1, shift2, shift3, shift4];

    let expectedRows = [
        [shift1, shift3],
        [shift2],
        [shift4],
    ];

    let rows = spreadShiftsToRows(shifts);

    expect(rows).toEqual(expectedRows);
});