import { combineReducers } from 'redux';
import { SET_IS_CONNECTED, SET_LOGIN_ERROR, SET_SOCKET, SET_USER } from '../constants/ActionName';

const socket = (state = {}, action) => {
    switch (action.type) {
    case SET_SOCKET:
        return action.socket;
    default:
        return state;
    }
};

const user = (state = { name: '', id: '' }, action) => {
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

const loginError = (state = '', action) => {
    switch (action.type) {
    case SET_LOGIN_ERROR:
        return action.loginError;
    default:
        return state;
    }
};

export default combineReducers({
    socket,
    user,
    isConnected,
    loginError,
});
