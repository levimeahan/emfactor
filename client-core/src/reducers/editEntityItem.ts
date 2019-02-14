import {EntityCollection, Reducer, State} from "../types";

interface EditEntityItemFn {
    <T>(
        entityCollection: Readonly<EntityCollection<T>>,
        entityId: number,
        changedData: Partial<T>
    ): EntityCollection<T>;
}

const editEntityItem: EditEntityItemFn = (entityCollection, entityId, changedData) => ({
    ...entityCollection,
    byId: {
        ...entityCollection.byId,
        [entityId]: {
            ...entityCollection.byId[entityId],
            ...changedData,
        }
    },
});

export default editEntityItem;
