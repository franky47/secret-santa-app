// https://github.com/shelljs/shelljs
require('shelljs/global')
env.NODE_ENV = 'production'

const chalk = require('chalk')
const path = require('path')
const config = require('../config')
const ora = require('ora')
const webpack = require('webpack')
const webpackConfig = require('./webpack.conf.prod')

console.log(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)

const spinner = new ora({
    text: 'building for production...',
    spinner: 'dots12'
})
spinner.start()

const assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
console.log(chalk.blue('Assets path: '), assetsPath)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', 'static/*', assetsPath)
console.log('Pre-build status:')
console.log(ls('-lA', assetsPath))

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
  console.log('Post-build status:')
  console.log(ls('-lA', assetsPath))
})
