import React, { useState } from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import moment from 'moment';
import omit from 'lodash/omit';

import { DayPickerRangeController } from 'react-dates';

import { START_DATE, END_DATE, HORIZONTAL_ORIENTATION, ANCHOR_LEFT } from 'react-dates/constants';

import isInclusivelyAfterDay from '../../utils/isInclusivelyAfterDay';
import 'react-dates/lib/css/_datepicker.css';


const defaultProps = {
    // example props for the demo
    autoFocusEndDate: false,
    initialStartDate: null,
    initialEndDate: null,
    startDateOffset: undefined,
    endDateOffset: undefined,
    showInputs: false,
    minDate: null,
    maxDate: null,

    // day presentation and interaction related props
    renderCalendarDay: undefined,
    renderDayContents: null,
    minimumNights: 0,
    isDayBlocked: () => false,
    isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
    isDayHighlighted: () => false,
    enableOutsideDays: false,

    // calendar presentation and interaction related props
    orientation: HORIZONTAL_ORIENTATION,
    verticalHeight: undefined,
    withPortal: false,
    initialVisibleMonth: null,
    numberOfMonths: 2,
    onOutsideClick() {},
    keepOpenOnDateSelect: false,
    renderCalendarInfo: null,
    isRTL: false,
    renderMonthText: null,
    renderMonthElement: null,

    // navigation related props
    navPrev: null,
    navNext: null,
    onPrevMonthClick() {},
    onNextMonthClick() {},

    // internationalization
    monthFormat: 'MMMM YYYY',
};


const EmfactorDateRangePicker = (props) => {
    const [focusedInput, setFocusedInput] = useState(props.autoFocusEndDate ? END_DATE : START_DATE);

    const passThroughProps = omit(props, [
        'autoFocus',
        'autoFocusEndDate',
        'initialStartDate',
        'initialEndDate',
        'showInputs',
        'dates',
        'setDates',
    ]);
    
    const setToSingleDay = () => props.setDates({startDate: props.dates.startDate, endDate: props.dates.startDate});

    const handleFocusChange = (focusedInput) => {
        console.log('handleFocusChange');
        setFocusedInput(!focusedInput ? START_DATE : focusedInput);
    };

    const handleBlur = () => props.dates.startDate && !props.dates.endDate ?
        setToSingleDay() : null;

    return <div>
        <DayPickerRangeController
            {...passThroughProps}

            startDate={props.dates.startDate}
            endDate={props.dates.endDate}
            onDatesChange={props.setDates}

            focusedInput={focusedInput}
            onFocusChange={handleFocusChange}
            onOutsideClick={handleBlur}
        />
    </div>;
};
EmfactorDateRangePicker.defaultProps = defaultProps;

const styles = StyleSheet.create({});

export default EmfactorDateRangePicker;