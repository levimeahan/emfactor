import spreadShiftsToRows from '../spreadShiftsToRows';

it('keeps subsequent shifts on the same row', () => {
    let shift1 = { startTime: 1, endTime: 3 },
        shift2 = { startTime: 3, endTime: 6 },
        shift3 = { startTime: 7, endTime: 9 };

    let shifts = [shift1, shift2, shift3];

    let rows = spreadShiftsToRows(shifts);

    expect(rows).toEqual([
        [shift1, shift2, shift3]
    ]);
});

it('separates concurrent shifts to different rows', () => {
    let shift1 = { startTime: 1, endTime: 3 },
        shift2 = { startTime: 2, endTime: 6 },
        shift3 = { startTime: 7, endTime: 9 },
        shift4 = { startTime: 2, endTime: 9 };

    let shifts = [shift1, shift2, shift3, shift4];

    let expectedRows = [
        [shift1, shift3],
        [shift2],
        [shift4],
    ];

    let rows = spreadShiftsToRows(shifts);

    expect(rows).toEqual(expectedRows);
});