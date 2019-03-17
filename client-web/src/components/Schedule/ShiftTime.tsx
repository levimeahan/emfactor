import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import formatShiftHour from "../../utils/formatShiftHour";
import arrayFromRange from "../../utils/arrayFromRange";
import {colors, sizes} from "../../themes/default";

const hours = arrayFromRange(0, 24);

const ShiftTime = ({ time, label, onChange, mode, extraStyles }) => (
    <div className={css(styles.container, extraStyles)}>
        {mode === 'EDIT' ?
            <ShiftTimeEdit
                time={time}
                label={label}
                onChange={onChange}
            />
            :
            <ShiftTimeDisplay time={time} />
        }
    </div>
);
ShiftTime.defaultProps = {
    extraStyles: null,
    label: '',
    onChange: () => {}
};


// Time
const ShiftTimeDisplay = ({ time }) => (
    <span className={css(styles.timeDisplay)}>{formatShiftHour(time)}</span>
);

const ShiftTimeEdit = ({ time, label, onChange }) => {
    let id = label.toLowerCase() + '-time';

    return <React.Fragment>
        <label htmlFor={id} className={css(styles.label)}>{label}</label>
        <select
            id={label.toLowerCase() + '-time'}
            onBlur={(e) => {e.stopPropagation()}}
            value={time}
            onChange={e => onChange(parseInt(e.currentTarget.value))}
        >
            {hours.map((hour, i) => (
                <option key={i} value={hour}>{hour}:00</option>
            ))}
        </select>
    </React.Fragment>;
};


const styles = StyleSheet.create({
    container: {
        fontSize: sizes.primaryFont - 2,
        width: '4.5em',
    },
    label: {
        display: 'inline-block',
        width: '4.5em',
    },
    timeDisplay: {
        color: colors.text.semiDark,
    },
});

export default ShiftTime;