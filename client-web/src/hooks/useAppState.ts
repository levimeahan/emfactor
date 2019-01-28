import { useContext } from 'react';
import StateContext from '../StateContext';

import { State } from 'emfactor-client-core';

export default function() {
    return <State>useContext(StateContext);
}