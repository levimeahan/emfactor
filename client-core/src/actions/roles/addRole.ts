import store from '../../store/index';

import changeErrorMessage from '../../reducers/changeErrorMessage';
import {State, Role, Reducer} from "../../types";

import getNextCollectionId from '../../utils/getNextCollectionId';

export default function addRole(name, permissions, subRoles, onSuccess: Function = null) {
    if(name.length <= 0) {
        store.dispatch(changeErrorMessage, 'Please provide a name!');
    }

    let newRole = {
        id: getNextCollectionId(store.getState().roles),
        name: name,
        permissions: permissions,
        subRoles: subRoles,
    };

    store.dispatch(roleAddSuccess, newRole);
    if(onSuccess) {
        onSuccess();
    }
};

const roleAddSuccess: Reducer = (prevState: State, newRole: Role) => ({
    ...prevState,
    roles: {
        byId: {
            ...prevState.roles.byId,
            [newRole.id]: newRole,
        },
        allIds: [ ...prevState.roles.allIds, newRole.id ]
    }
});