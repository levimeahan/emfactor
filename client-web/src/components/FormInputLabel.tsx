import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

const FormInputLabel = ({ inputId, children, style }) => (
    <label htmlFor={inputId} className={css(styles.label, style)}>{children}</label>
);
FormInputLabel.defaultProps = {
    inputId: null,
    style: false,
};

const styles = StyleSheet.create({
    label: {
        fontWeight: 'bold'
    }
});

export default FormInputLabel;