import store from "../../store";
import editEntityItem from "../../reducers/editEntityItem";
import {Role} from "../../types";

export default function editRole(id, changedData: Partial<Role>, onSuccess: Function = null) {
    store.dispatch(prevState => ({
        ...prevState,
        roles: editEntityItem(prevState.roles, id, changedData)
    }));

    if(onSuccess) {
        onSuccess();
    }
}