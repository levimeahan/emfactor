import { rangesOverlap } from "../number";

it('matches range within range', () => {
    expect(rangesOverlap({ start: 2, end: 3 }, {start: 1, end: 5 })).toBe(true);
    expect(rangesOverlap({ start: 1, end: 5 }, {start: 2, end: 3 })).toBe(true);

    expect(rangesOverlap({ start: -3, end: -2 }, { start: -4, end: -1 })).toBe(true);
});

it('matches equal ranges', () => {
    expect(rangesOverlap({ start: 0, end: 0 }, { start: 0, end: 0 })).toBe(true);
    expect(rangesOverlap({ start: 1, end: 3 }, {start: 1, end: 3})).toBe(true);
});

it('fails ranges outside', () => {
    expect(rangesOverlap({ start: 1, end: 3 }, { start: 4, end: 8 })).toBe(false);
    expect(rangesOverlap({ start: 9, end: 10 }, { start: 4, end: 8 })).toBe(false);
});

it('matches border ranges', () => {
    expect(rangesOverlap({ start: 1, end: 3 }, { start: 3, end: 4})).toBe(true);
    expect(rangesOverlap({ start: 4, end: 5 }, { start: 3, end: 4})).toBe(true);
});