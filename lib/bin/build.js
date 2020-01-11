#!/usr/bin/env node

require('../lib/load-env')

const rimraf = require('rimraf')
const webpack = require('webpack')
const webpackConfig = require('../lib/webpack-config')
const statsOptions = require('../lib/stats-options')
const { BUILD_PATH } = require('../lib/paths')

// Compiler
const compiler = webpack(webpackConfig)

// Clear
rimraf.sync(BUILD_PATH)

// Build
compiler.run((err, stats) => {
  if (err) throw err
  console.log(stats.toString(statsOptions))
})
