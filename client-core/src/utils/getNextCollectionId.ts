import {EntityCollection} from "../types";

export default function getNextCollectionId(collection: EntityCollection<any>) {
    let highestId = 0;

    collection.allIds.forEach(id => { id > highestId ? highestId = id : null });

    return highestId + 1;
};