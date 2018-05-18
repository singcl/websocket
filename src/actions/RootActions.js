import { SET_IS_CONNECTED, SET_LOGIN_ERROR, SET_SOCKET, SET_USER } from '../constants/ActionName';

export const setSocket = (socket) => ({ type: SET_SOCKET, socket });

export const setUser = (user) => ({ type: SET_USER, user });

export const setIsConnected = (isConnected) => ({ type: SET_IS_CONNECTED, isConnected });
export const setLoginError = (loginError) => ({ type: SET_LOGIN_ERROR, loginError });
