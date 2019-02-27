import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';

import { selectors } from 'emfactor-client-core';
import useAppState from "../hooks/useAppState";

import pageStyles from '../styles/page';
import {colors} from "../themes/default";

// Main Component
const Guides = () => {
    const state = useAppState();

    return <div data-testid="guidesPage" className={css(pageStyles.container)}>
        <h2 className={css(pageStyles.header)}>Guides</h2>
        {selectors.allGuides(state).map((guide, i) => (
            <Guide
                key={i}
                name={guide.name}
                content={guide.content}
            />
        ))}
    </div>;
};

// Guide
const Guide = ({ name, content }) => (
    <div>
        <h3 className={css(pageStyles.header2, styles.guideHeader)}>{name}</h3>
        <div className={css(styles.guideContent)}>{content}</div>
    </div>
);

// Styles
const styles = StyleSheet.create({
    guideHeader: {
        textAlign: 'left',
    },
    guideContent: {
        textAlign: 'left',
        padding: '10px',
        lineSpacing: '0px',
        whiteSpace: 'pre-wrap',
        background: colors.background.secondary,
    },
});

export default Guides;