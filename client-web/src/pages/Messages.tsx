import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import pageStyles from "../styles/page";

const Messages = () => {
    return <div data-testid="messagesPage" className={css(pageStyles.container)}>
        <h2 className={css(pageStyles.header)}>Messages</h2>
</div>;
};

const styles = StyleSheet.create({});

export default Messages;