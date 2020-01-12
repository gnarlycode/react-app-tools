const { requireOrNothing } = require('../helpers/require')

const defaults = {
  host: '0.0.0.0',
  port: 8080,
  baseUrl: '',
  // routerConfig: './src/routes',
  // serveStatic: true,
  // babelRuntime: true,
}

const config = {
  ...defaults,
  ...requireOrNothing('gnarly.config.js'),
  ...requireOrNothing('gnarly.config.local.js'),
  env: process.env.NODE_ENV || 'production',
  isDev: process.env.NODE_ENV === 'development',
}

module.exports = config
