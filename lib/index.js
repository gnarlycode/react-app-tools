module.exports = {
  createServerEntry: require('./lib/create-server-entry'),
  getExpressServer: require('./lib/get-express-server'),
  getWebpackBuilder: require('./lib/get-webpack-builder'),
  getWebpackConfig: require('./lib/get-webpack-config'),
  getWebpackRouter: require('./lib/get-webpack-router'),
  statsOptions: require('./lib/stats-options'),
}
