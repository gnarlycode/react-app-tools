module.exports = {
  // Server listening
  host: '0.0.0.0',
  port: 8080,

  // Url prefix
  // baseUrl: '/base-url',

  // For static renderer, used when you run `npm run build-static` or `build-all`
  routerConfig: './src/routes',

  // Serve static with express (do not enable if static served with nginx for example)
  serveStatic: true,

  // Add extra express app
  // expressApp: './api/index.js',

  // Add babel transform runtime
  babelRuntime: true,

  // Browsers list
  browsers: ['last 2 versions', '>= 1%'],
}
