import { StyleSheet } from 'aphrodite/no-important';

const pageStyles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '15px',
    },
    header: {
        fontSize: '1.5em',
        fontWeight: 700,
        margin: '0.25em 0 0.25em',
    },
    header2: {
        fontSize: '1.25em',
        fontWeight: 500,
        margin: '0.2em 0 0.2em',
    },
});

export default pageStyles;