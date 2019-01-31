export default function arrayFromRange(start, stop, step = 1) {
    return Array.from(
        { length: (stop - start) / step },
        (_, i) => start + (i * step)
    );
}
