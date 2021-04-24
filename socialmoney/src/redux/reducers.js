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

function userfollows(state = [], action = {}) {
    switch(action.type) {
        case 'USER_FOLLOWS':
            return action.payload.follows;
        default:
            return state;
    }
}

function userfollowers(state = [], action = {}) {
    switch(action.type) {
        case 'USER_FOLLOWERS':
            return action.payload.follows;
        default:
            return state;
    }
}

function visitfollows(state = [], action = {}) {
    switch(action.type) {
        case 'VISIT_FOLLOWS':
            return action.payload.follows;
        default:
            return state;
    }
}

function visitfollowers(state = [], action = {}) {
    switch(action.type) {
        case 'VISIT_FOLLOWERS':
            return action.payload.follows;
        default:
            return state;
    }
}

const GlobalState = (combineReducers({
    user,
    visituser,
    userfollows,
    userfollowers,
    visitfollows,
    visitfollowers
}));

export default GlobalState;