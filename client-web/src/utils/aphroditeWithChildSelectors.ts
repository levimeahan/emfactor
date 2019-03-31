import { StyleSheet as BaseStyleSheet } from 'aphrodite/no-important';

const childSelectorHandler = (selector, baseSelector, callback) => {
    if(selector[0] !== '&') return null;

    return callback(baseSelector + ' ' + selector.slice(1));
};
const childSelectExtension = { selectorHandler: childSelectorHandler };

const { StyleSheet, css } = BaseStyleSheet.extend([childSelectExtension]);

export { StyleSheet, css };