import React, { useState } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

import { selectors, actions } from 'emfactor-client-core';

import useAppState from "../hooks/useAppState";


import pageStyles from '../styles/page';
import {colors} from "../themes/default";
import useFormInput from "../hooks/useFormInput";
import FormInput from "../components/FormInput";

const Policies = () => {
    const state = useAppState();

    return <div className={css(pageStyles.container, styles.container)} data-testid="policiesPage">
        <h2 className={css(pageStyles.header)}>Policies</h2>
        {selectors.allPolicies(state).map((policy, i) => (
            <Policy
                key={i}
                id={policy.id}
                name={policy.name}
                content={policy.content}
            />
        ))}
    </div>;
};

const Policy = ({ id, name, content }) => {
    const [editing, setEditing] = useState(false);

    return <div className={css(styles.policyContainer)}>
        {editing ?
            <EditPolicy
                name={name}
                content={content}
                update={(name, content) => {
                    actions.editPolicy(id, name, content);
                    setEditing(false);
                }}
            />
            :
            <DisplayPolicy
                name={name}
                content={content}
                edit={() => setEditing(true)}
            />
        }
    </div>
};

const DisplayPolicy = ({ name, content, edit }) => (
    <React.Fragment>
        <h3 className={css(pageStyles.header2, styles.policyHeader)}>
            {name} <button onClick={edit}>Edit</button>
        </h3>
        <div className={css(styles.policyContent)}>
            {content}
        </div>
    </React.Fragment>
);

const EditPolicy = ({ name, content, update }) => {
    const nameInput = useFormInput(name);
    const contentInput = useFormInput(content); 
    
    return <React.Fragment>
        <h3 className={css(styles.policyHeader)}>
            <FormInput
                type='text'
                name='name'
                label=''
                labelType={null}
                manager={nameInput}
            />
        </h3>
        <div className={css(styles.policyContent)}>
            <textarea
                name="Policy Content"
                className={css(styles.policyContentInput)}
                value={contentInput.value}
                onChange={(e) => contentInput.onChange(e.currentTarget.value)}
            />
        </div>
        <button onClick={() => update(nameInput.value, contentInput.value)}>Save</button>
    </React.Fragment>;
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    policyContainer: {
        textAlign: 'left',
        alignSelf: 'stretch',
    },
    policyHeader: {
        margin: '0.75em 0 0.5em',
    },
    policyNameInput: {
        
    },
    policyContent: {
        padding: '8px',
        background: colors.background.secondary,
    },
    policyContentInput: {
        
    },
});

export default Policies;