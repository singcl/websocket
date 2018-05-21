import { combineReducers } from 'redux';
import { POST_MSG, SET_IS_CONNECTED, SET_IS_EMPTY_SEND, SET_LOGIN_ERROR, SET_SOCKET, SET_TYPING_VALUE, SET_USER } from '../constants/ActionName';

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

const isEmptySend = (state = true, action) => {
    switch (action.type) {
    case SET_IS_EMPTY_SEND:
        return action.isEmptySend;
    default:
        return state;
    }
};

const msgs = (state = [], action) => {
    const {
        id,
        senderName,
        content,
        color,
        receivedAt,
    } = action;
    const msg = {
        id,
        senderName,
        content,
        color,
        receivedAt,
    };
    switch (action.type) {
    case POST_MSG:
        return [...state, msg];
    default:
        return state;
    }
};

const typingValue = (state = '', action) => {
    switch (action.type) {
    case SET_TYPING_VALUE:
        return action.typingValue;
    default:
        return state;
    }
};

export default combineReducers({
    socket,
    user,
    isConnected,
    loginError,
    isEmptySend,
    msgs,
    typingValue,
});
