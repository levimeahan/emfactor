import store from '../store';

import editEntityItem from '../reducers/editEntityItem';

export default function editPolicy(id: number, name: string, content: string) {
    store.dispatch(state => ({
        ...state,
        policies: editEntityItem(state.policies, id, { name, content })
    }));
}