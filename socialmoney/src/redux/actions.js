export function userLogged(account){
    return {type: 'USER_LOGGED', payload:{account}}
}

export function userVisited(account){
    return {type: 'USER_VISITED', payload:{account}}
}