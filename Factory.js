const uuidV4 = require('uuid/v4');

const createUser = function({ name= '' } = {}) {
    return {
        id: uuidV4(),
        name
    };
};

// const str = '0'+ date.getMinutes();
// str.slice(-2) === str.slice(-2, str.length)
// 这里很优雅的实现了分和秒 从数字转换为字符串 再补零
const getTime = function(date) {
    const minutesStr = '0' + date.getMinutes();
    const secondsStr = '0' + date.getSeconds();
    return `${date.getHours()}:${minutesStr.slice(-2)}:${secondsStr.slice(-2)}`;
};

module.exports = {
    createUser,
    getTime
};
