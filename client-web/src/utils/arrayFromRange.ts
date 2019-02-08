export default function arrayFromRange(start, stop, step = 1) {
    return Array.from(
        { length: (stop - start + 1) / step },
        (_, i) => start + (i * step)
    );
}
