import { EntityCollection, Role } from "../types";

/**
 * Calls a supplied testFn on each role and subrole of the provided role. Returns true immediately if the
 * test returns true, or false if the test did not return true on any role/sub-role
 *
 *
 */
export const testRoleRecursive = (
    allRoles: EntityCollection<Role>,
    roleId: number,
    testFn: (role: Role) => boolean
) => {
    if(testFn(allRoles.byId[roleId])) {
        return true;
    }

    let subRoles = allRoles.byId[roleId].subRoles;
    if(subRoles.length < 1) {
        return false;
    }

    for(let id of subRoles) {
        if(testRoleRecursive(allRoles, id, testFn)) {
            return true;
        }
    }
};