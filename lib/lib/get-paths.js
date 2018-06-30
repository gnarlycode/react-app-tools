const path = require('path')

module.exports = ({ ROOT_PATH }) => {
  const BUILD_PATH = path.join(ROOT_PATH, 'build')
  const fromRoot = p => path.join(ROOT_PATH, p)
  const fromBuild = p => path.join(BUILD_PATH, p)
  return {
    BUILD_PATH: BUILD_PATH,
    CONFIG_PATH: fromRoot('config'),
    PUBLIC_PATH: fromBuild('public'),
    ROOT_PATH: ROOT_PATH,
    SERVER_RENDERER_PATH: fromBuild('server.js'),
    SRC_PATH: fromRoot('src'),
    STATIC_PATH: fromRoot('static'),
    STATS_PATH: fromBuild('stats.json'),
  }
}
