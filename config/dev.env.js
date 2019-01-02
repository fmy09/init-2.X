'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"http://result.eolinker.com/GMBQJmsafab7b2109f581b40794d8881833f1aef5521d02?uri="'
})
