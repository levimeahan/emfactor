/**
 * Takes a number of shifts and spreads them to rows to be displayed so that shifts that share the same time do not
 * render in the same space
 *
 * @param shifts
 * @returns {any[]}
 */
export default function spreadShiftsToRows(shifts: { startHour: number, endHour: number }[]) {
    let rows = [];

    shifts.sort((a, b) => a.startHour > b.startHour ? 1 : -1);

    shifts.forEach((shift) => {
        if(rows.length < 1) {
            rows.push([shift]);
            return;
        }

        for(let rowId in rows) {
            if(!rows.hasOwnProperty(rowId)) {
                continue;
            }

            let lastShift = rows[rowId].slice(-1)[0];

            if(lastShift.endHour <= shift.startHour) {
                rows[rowId].push(shift);
                return;
            }
        }

        rows.push([shift]);
    });

    return rows;
}