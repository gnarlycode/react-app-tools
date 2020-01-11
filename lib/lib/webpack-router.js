const express = require('express')
const webpack = require('webpack')
const config = require('./config')
const statsOptions = require('./stats-options')
const webpackConfig = require('./webpack-config')

// Express router
const router = express.Router()

// Webpack compilers
const multiCompiler = webpack(webpackConfig)

// Webpack Middlewares
router.use(
  require('webpack-dev-middleware')(multiCompiler, {
    historyApiFallback: true,
    hot: true,
    inline: true,
    lazy: false,
    noInfo: true,
    publicPath: webpackConfig[0].output.publicPath,
    quiet: true,
    serverSideRender: true,
    stats: statsOptions,
  }),
)
router.use(
  require('webpack-hot-middleware')(multiCompiler.compilers[0], {
    path: config.baseUrl + '/__webpack_hmr',
  }),
)
router.use(require('webpack-hot-server-middleware')(multiCompiler))

module.exports = router
