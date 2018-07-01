const express = require('express')
const webpack = require('webpack')
const statsOptions = require('./stats-options')
const getWebpackConfig = require('./get-webpack-config')

module.exports = ({ ROOT_PATH, config }) => {
  if (!config) config = getWebpackConfig({ ROOT_PATH })

  // Express router
  const router = express.Router()

  // Webpack compilers
  const multiCompiler = webpack(config)

  // Webpack Error Plugin
  const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
  multiCompiler.apply(new FriendlyErrorsWebpackPlugin())

  // Webpack Middlewares
  router.use(
    require('webpack-dev-middleware')(multiCompiler, {
      historyApiFallback: true,
      hot: true,
      inline: true,
      lazy: false,
      noInfo: true,
      publicPath: config[0].output.publicPath,
      quiet: true,
      serverSideRender: true,
      stats: statsOptions,
    }),
  )
  router.use(require('webpack-hot-middleware')(multiCompiler.compilers[0]))
  router.use(require('webpack-hot-server-middleware')(multiCompiler))

  // Error handler
  const errorhandler = require('errorhandler')
  errorhandler.title = '¯\\_(ツ)_/¯'
  router.use(errorhandler())

  return router
}
