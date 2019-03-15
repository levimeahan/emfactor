import {colors} from "../../themes/default";
import {StyleSheet} from "aphrodite/no-important";

const scheduleShiftStyles = StyleSheet.create({
    container: {
        boxSizing: 'border-box',
        padding: '0',
        alignSelf: 'center',
        backgroundColor: '#3a3a3a',
        border: '1px solid #303030',
    },
    shiftContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: '2.7em',
        padding: 0,
    },


    startTime: {
        marginLeft: '6px',
        textAlign: 'left',
    },
    endTime: {
        marginRight: '6px',
        textAlign: 'right',
    },

    shiftDetails: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '14px 4px 8px',
        minHeight: '22px',
        position: 'relative',
    },
    nameDisplay: {
        position: 'absolute',
        top: '-2px',
        left: '10px',
        fontSize: '10px',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: colors.text.medium,
    },
    employeeNameDisplay: {
        fontWeight: 'bold',
        fontFamily: 'Lucida Sans Unicode',
        color: colors.text.semiBright,
        lineHeight: '1em',
    },
    shiftName: {
        margin: 0,
        fontSize: '10px',
        backgroundColor: '#333',
    },

    nameInput: {
        width: '110px',
        margin: 0,
        boxSizing: 'border-box',
    },
    nameInputContainer: {
        display: 'flex',
        flexDirection: 'row',

        margin: '3px 0',
        padding: '4px',
        borderTopLeftRadius: '5px',
        borderBottomLeftRadius: '5px',

        background: colors.background.secondaryDark,
    },
    nameInputLabel: {
        width: '3.7em',
        padding: '0 3px',
        fontSize: '14px',
        fontWeight: 'normal',
        textAlign: 'left',
    },
});

export default scheduleShiftStyles;