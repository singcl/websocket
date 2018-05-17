import { SET_SOCKET, SET_USER } from '../constants/ActionName';

export const setSocket = (socket) => ({ type: SET_SOCKET, socket });

export const setUser = (user) => ({ type: SET_USER, user });
