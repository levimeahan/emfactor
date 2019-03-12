export const inRange = (number, min, max) => number >= min && number <= max;

export const rangesOverlap = (range1: { start, end }, range2: {start, end}) => {
    let range1Size = range1.end - range1.start;
    let range2Size = range2.end - range2.start;

    if(range1Size < 0 || range2Size < 0) {
        throw new Error("Invalid range!");
    }

    // test smaller range to see if it touches larger range
    if(range1Size < range2Size) {
        return inRange(range1.start, range2.start, range2.end) || inRange(range1.end, range2.start, range2.end);
    }
    else {
        return inRange(range2.start, range1.start, range1.end) || inRange(range2.end, range1.start, range1.end);
    }
};
