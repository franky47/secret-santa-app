const merge = require('webpack-merge')
const devEnv = require('./env.dev')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"'
})
