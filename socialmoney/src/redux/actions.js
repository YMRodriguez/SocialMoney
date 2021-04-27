export function userLogged(account){
    return {type: 'USER_LOGGED', payload:{account}}
}

export function userUnlogged(){
    return {type: 'USER_UNLOGGED', payload:{}}
}

export function userVisited(account){
    return {type: 'USER_VISITED', payload:{account}}
}

export function userFollows(follows){
    return {type: 'USER_FOLLOWS', payload:{follows}}
}

export function userFollowers(follows){
    return {type: 'USER_FOLLOWERS', payload:{follows}}
}

export function visitFollows(follows){
    return {type: 'VISIT_FOLLOWS', payload:{follows}}
}

export function visitFollowers(follows){
    return {type: 'VISIT_FOLLOWERS', payload:{follows}}
}
