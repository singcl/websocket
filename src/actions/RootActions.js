import { SET_IS_CONNECTED, SET_SOCKET, SET_USER } from '../constants/ActionName';

export const setSocket = (socket) => ({ type: SET_SOCKET, socket });

export const setUser = (user) => ({ type: SET_USER, user });

export const setIsConnected = (isConnected) => ({ type: SET_IS_CONNECTED, isConnected });
