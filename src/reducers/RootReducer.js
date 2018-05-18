import { combineReducers } from 'redux';
import { SET_IS_CONNECTED, SET_SOCKET, SET_USER } from '../constants/ActionName';

const socket = (state = null, action) => {
    switch (action.type) {
    case SET_SOCKET:
        return action.socket;
    default:
        return state;
    }
};

const user = (state = null, action) => {
    switch (action.type) {
    case SET_USER:
        return action.user;
    default:
        return state;
    }
};

const isConnected = (state = false, action) => {
    switch (action.type) {
    case SET_IS_CONNECTED:
        return action.isConnected;
    default:
        return state;
    }
};

export default combineReducers({
    socket,
    user,
    isConnected,
});
