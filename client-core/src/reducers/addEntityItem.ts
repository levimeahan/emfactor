import {EntityCollection, Reducer, State} from "../types";
import getNextCollectionId from "../utils/getNextCollectionId";

interface AddEntityItemFn {
    <T>(
        entityCollection: Readonly<EntityCollection<T>>,
        data: T
    ): EntityCollection<T>;
}

const addEntityItem: AddEntityItemFn = (entityCollection, data) => {
    let id = getNextCollectionId(entityCollection);

    return {
        ...entityCollection,
        byId: {
            ...entityCollection.byId,
            [id]: {
                id: id,
                ...data,
            }
        },
        allIds: [
            ...entityCollection.allIds,
            id
        ],
    }
};

export default addEntityItem;
