import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

interface ScheduleWeekControlsProps {
    draft: boolean,
    setDraft: (boolean) => void;
}
const ScheduleWeekControls = ({ draft, setDraft }) => {
    return <div className={css(styles.SWCContainer)}>
        {draft ?
            <DraftView setDraft={setDraft} />
            :
            <FinalizedView setDraft={setDraft} />
        }
    </div>;
};

const DraftView = ({ setDraft }) => (
    <>
        <span className={css(styles.isDraft)}>Draft</span>
        <button className={css(styles.button)} onClick={() => setDraft(false)}>Finalize</button>
    </>
);

const FinalizedView = ({ setDraft }) => (
    <>
        <span className={css(styles.isFinalized)}>Finalized</span>
        <button className={css(styles.button)} onClick={() => setDraft(true)}>Revert to Draft</button>
    </>
);

const styles = StyleSheet.create({
    SWCContainer: {
        textAlign: 'left',
        padding: '8px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    isDraft: {
        color: '#c7c700'
    },
    isFinalized: {
        color: '#10B000',
    },
    button: {
        margin: '5px 0',
    },
});

export default ScheduleWeekControls;