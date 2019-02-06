import {StyleSheet} from "aphrodite/no-important";

export default StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'stretch',
        boxShadow: '3px 3px 8px #222222'
    },
    header: {
        fontWeight: 'bold',
    },
    item: {
        display: 'flex',
        flexDirection: 'row',

        padding: '5px 0',
    },
});