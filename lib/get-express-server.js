const path = require('path')
const express = require('express')
const getConfig = require('./get-config')
const getPaths = require('./get-paths')
const getWebpackRouter = require('./get-webpack-router')

module.exports = ({ ROOT_PATH }) => {
  const config = getConfig()
  const {
    PUBLIC_PATH,
    SERVER_RENDERER_PATH,
    STATIC_PATH,
    STATS_PATH,
  } = getPaths({
    ROOT_PATH,
  })

  const IS_SERVING_STATIC = process.env.EXPRESS_SERVING_STATIC === 'true'

  // Express app
  const app = express()

  // Static assets serving
  if (IS_SERVING_STATIC) app.use('/', express.static(STATIC_PATH))

  // Additional App
  if (process.env.EXPRESS_APP) {
    app.use(require(path.resolve(process.env.EXPRESS_APP)))
  }

  // Static or development
  if (config.isDev) {
    app.use(getWebpackRouter({ ROOT_PATH }))
  } else {
    // Require stats
    let stats
    try {
      stats = require(STATS_PATH)
    } catch (ex) {
      throw new Error(
        'Client bundle stats.json not found. Try running `npm run build`',
      )
    }

    // Require server renderer
    let serverRenderer
    try {
      serverRenderer = require(SERVER_RENDERER_PATH).default(stats)
    } catch (ex) {
      console.error(ex)
      throw new Error('\nServer bundle error. Try running `npm run build`')
    }

    // Static assets serving
    if (IS_SERVING_STATIC) app.use('/', express.static(PUBLIC_PATH))

    // Server renderer middleware
    app.use(serverRenderer)
  }

  return app
}
