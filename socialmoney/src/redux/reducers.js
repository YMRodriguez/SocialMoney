import { combineReducers } from "redux";

function user(state = {}, action = {}) {
    switch(action.type) {
        case 'USER_LOGGED':
            return action.payload.account;
        default:
            return state;
    }
}

function visituser(state = {}, action = {}) {
    switch(action.type) {
        case 'USER_VISITED':
            return action.payload.account;
        default:
            return state;
    }
}

const GlobalState = (combineReducers({
    user,
    visituser
}));

export default GlobalState;