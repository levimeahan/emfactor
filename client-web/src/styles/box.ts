import { StyleSheet } from 'aphrodite/no-important';
import {colors} from "../themes/default";

export default StyleSheet.create({
    container: {
        padding: '8px',
        background: colors.background.secondary,
    },
    header: {
        fontSize: '1.2em',
        fontWeight: 500,
        margin: '0 0 5px',
    },
    header2: {
        fontSize: '1.1em',
        fontWeight: 500,
        margin: '0 0 4px',
    },
});