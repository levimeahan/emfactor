export const rolesArray = (state) => state.roles.allIds.map(id =>
    state.roles.byId[id]
);

export const roleNames = (state, roleIds) => {
    return roleIds
        .filter(id => state.roles.byId.hasOwnProperty(id))
        .map(id => state.roles.byId[id].name);
};

export const roleMatches = (state, roleId, subRoleId) => {
    if(roleId === subRoleId) {
        return true;
    }

    let subRoles = state.roles.byId[roleId].subRoles;
    if(subRoles.length < 1) {
        return false;
    }

    for(let id of subRoles) {
        if(roleMatches(state, id, subRoleId)) {
            return true;
        }
    }

    return false;
};