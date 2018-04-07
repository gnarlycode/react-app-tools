const rimraf = require('rimraf')
const webpack = require('webpack')
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')
const getPaths = require('./get-paths')
const statsOptions = require('./stats-options')
const getWebpackConfig = require('./get-webpack-config')

module.exports = ({ ROOT_PATH, config }) => () => {
  if (!config) config = getWebpackConfig({ ROOT_PATH })
  if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production'

  const { BUILD_PATH } = getPaths({ ROOT_PATH })

  // Cleans the dist directory ready for a new build
  rimraf(BUILD_PATH, () => {
    // Bundles app with Webpack
    const compiler = webpack(config)
    compiler.apply(new ProgressBarWebpackPlugin())
    compiler.run((err, stats) => {
      if (err) throw err
      console.log(stats.toString(statsOptions))
    })
  })
}
