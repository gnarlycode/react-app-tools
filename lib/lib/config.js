const { requireOrNothing } = require('../helpers/require')

const defaults = {
  host: '0.0.0.0',
  port: 8080,
  baseUrl: '',
  browsers: [
    'last 2 versions',
    '>= 1%',
    'safari >= 5',
    'IE >= 10',
    'ios >= 6',
    'android >= 4',
  ],
  // routerConfig: './src/routes',
  // serveStatic: true,
  // expressApp: './api/index.js',
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
