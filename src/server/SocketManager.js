const _ = require('lodash');

// const io = require('./index.js').io;

const {
    VERIFY_USER,
    USER_CONNECTED,
    USER_DISCONNECTED,
    OTHER_DISCONNECTED,
    OTHER_SENT,
    SELF_SENT,
} = require('../constants/Events');

const {
    EMPTY,
    EXISTED,
} = require('../constants/LoginError');

let connectedUsers = {};

const isExistedUser = function isExistedUser(userList, username) {
    const isExisted = _.hasIn(userList, username);
    if (isExisted) {
        return {
            isValid: false,
            kind: EXISTED,
        };
    }
    return { isValid: true };
};

const isValidUser = function isValidUser(userList, username) {
    if (!username) {
        return {
            isValid: false,
            kind: EMPTY,
        };
    }
    return isExistedUser(userList, username);
};

const addUser = function addUser(userList, user) {
    return _.assign({}, userList, { [user.name]: user });
};

const removeUser = function removeUser(userList, username) {
    _.omit(userList, username);
};

module.exports = function SM(socket) {
    console.log(`Socket id is ${socket.id}`);
    socket.on(VERIFY_USER, (name, fn) => {
        console.log(connectedUsers);
        fn(isValidUser(connectedUsers, name));
    });

    socket.on(USER_CONNECTED, (user) => {
        connectedUsers = addUser(connectedUsers, user);
        console.log(connectedUsers);
    });

    // socket.on(USER_DISCONNECTED, (username) => {
    //     connectedUsers = removeUser(connectedUsers, username);
    //     socket.broadcast.emit(OTHER_DISCONNECTED, username);
    // });

    // socket.on(SELF_SENT, (username, content) => {
    //     socket.broadcast.emit(OTHER_SENT, username, content);
    // });
};
