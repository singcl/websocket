const _ = require('lodash');

const io = require('./index.js').io;

const {
    VERIFY_USER,
    USER_CONNECTED,
    USER_DISCONNECTED,
    OTHER_DISCONNECTED,
    OTHER_SENT,
    SELF_SENT
} = require('../constants/Events');

const {
    EMPTY,
    EXISTED
} = require('../constants/LoginError');