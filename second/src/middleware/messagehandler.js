'use strict'

const config = require('./Auth');

module.exports = (type) => {
    return {
        code : type,
        message : config.errCode[type]
    }
}