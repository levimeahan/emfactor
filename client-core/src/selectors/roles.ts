export const rolesArray = (state) => state.roles.allIds.map(id =>
    state.roles.byId[id]
);

export const roleNames = (state, roleIds) => {
    return roleIds
        .filter(id => state.roles.byId.hasOwnProperty(id))
        .map(id => state.roles.byId[id].name);
};