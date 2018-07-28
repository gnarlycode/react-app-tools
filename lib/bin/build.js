#!/usr/bin/env node

require('../lib/load-env')

const rimraf = require('rimraf')
const webpack = require('webpack')
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')
const webpackConfig = require('../lib/webpack-config')
const statsOptions = require('../lib/stats-options')
const { BUILD_PATH } = require('../lib/paths')

const compiler = webpack(webpackConfig)
const progress = new ProgressBarWebpackPlugin()
progress.apply(compiler)

rimraf(BUILD_PATH, () => {
  compiler.run((err, stats) => {
    if (err) throw err
    console.log(stats.toString(statsOptions))
  })
})
