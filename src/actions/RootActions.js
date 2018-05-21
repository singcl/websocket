import { POST_MSG, SET_IS_CONNECTED, SET_IS_EMPTY_SEND, SET_LOGIN_ERROR, SET_SOCKET, SET_TYPING_VALUE, SET_USER } from '../constants/ActionName';

const uuidV4 = require('uuid/v4');
const { getTime } = require('../Factory');

export const setSocket = (socket) => ({ type: SET_SOCKET, socket });

export const setUser = (user) => ({ type: SET_USER, user });

export const setIsConnected = (isConnected) => ({ type: SET_IS_CONNECTED, isConnected });
export const setLoginError = (loginError) => ({ type: SET_LOGIN_ERROR, loginError });
export const setIsEmptySend = (isEmptySend) => ({ type: SET_IS_EMPTY_SEND, isEmptySend });
export const postMsg = ({ senderName, content, color }) => ({
    type: POST_MSG,
    senderName,
    content,
    color,
    id: uuidV4(),
    receivedAt: getTime(new Date()),
});

export const setTypingValue = (typingValue) => ({ type: SET_TYPING_VALUE, typingValue });
