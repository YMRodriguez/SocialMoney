export function userLogged(account){
    return {type: 'USER_LOGGED', payload:{account}}
}

export function userUnlogged(){
    return {type: 'USER_UNLOGGED', payload:{}}
}

export function userVisited(account){
    return {type: 'USER_VISITED', payload:{account}}
}