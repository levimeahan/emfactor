import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import pageStyles from "../styles/page";

const Notifications = () => {
    return <div data-testid="notificationsPage" className={css(pageStyles.container)}>
        <h2 className={css(pageStyles.header)}>Notifications</h2>
    </div>;
};

const styles = StyleSheet.create({});

export default Notifications;