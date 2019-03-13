import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import { actions, UIScheduleWeek} from 'emfactor-client-core';

import ScheduleDay from "./ScheduleDay";

import pageStyles from '../../styles/page';
import {ScheduleMode} from "../../types";
import ScheduleWeekControls from "./ScheduleWeekControls";

interface ScheduleWeekProps extends UIScheduleWeek {
    name?: string;
    setDraft: (boolean) => void;
    mode: ScheduleMode;
}
const ScheduleWeek = ({ id, name, startTimestamp, draft, setDraft, days, dayIds, mode }: ScheduleWeekProps) => {
    return <div className={css(styles.container)}>
        {name ?
            <h2 className={css(pageStyles.header2, styles.weekHeader)}>{name}</h2>
        : null}
        {mode === 'ASSIGN' ?
            <ScheduleWeekControls
                draft={draft}
                setDraft={setDraft}
            />
        : null}
        {dayIds.map((dayId) => {
            const day = days[dayId];

            return <div key={dayId} className={css(styles.dayContainer)}>
                <ScheduleDay
                    name={day.weekday}
                    date={`${day.month} ${day.date}`}
                    shifts={day.shifts}
                    headerStyle={styles.dayHeaderContainer}
                    mode={mode}
                    actions={{
                        addShift: () => actions.schedule.addShift(dayId),
                        editShift: (shiftId, baseShiftId, data) => {
                            if(draft) {
                                actions.schedule.editBaseShift(baseShiftId, data)
                            }
                            else {
                                actions.schedule.editShift(shiftId, data)
                            }
                        },
                        assignShift: (shiftId, baseShiftId, data) => actions.schedule.assignShift(id, shiftId, baseShiftId, data),
                    }}
                />
            </div>
        })}
    </div>;
};
ScheduleWeek.defaultProps = {
    setDraft: () => {}
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        margin: '8px',
    },
    weekHeader: {
        textAlign: 'left',
        margin: '0',
    },
    dayContainer: {
        margin: '5px 0',
    },
    dayHeaderContainer: {
        width: '6em'
    },
});

export default ScheduleWeek;