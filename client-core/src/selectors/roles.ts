import { testRoleRecursive } from "../utils/roles";

export const rolesArray = (state) => state.roles.allIds.map(id =>
    state.roles.byId[id]
);

export const roleNames = (state, roleIds) => {
    return roleIds
        .filter(id => state.roles.byId.hasOwnProperty(id))
        .map(id => state.roles.byId[id].name);
};

export const roleMatches = (state, roleId, targetRoleId) =>
    testRoleRecursive(
        state.roles,
        roleId,
        (role) => role.id == targetRoleId
    );

export const roleHasPermission = (state, roleId, permission) =>
    testRoleRecursive(
        state.roles,
        roleId,
        (role) => role.permissions.indexOf(permission) !== -1
    );