module.exports = {
  // Server listening
  host: '0.0.0.0',
  port: 8080,

  // Url prefix
  baseUrl: '/base-url',

  // For static renderer
  routerConfig: './src/routes',

  // Serve static with express (disable if static served with nginx for example)
  expressStatic: true,

  // Add express app
  // expressApp: './api/index.js',

  // Add babel transform runtime
  babelRuntime: true,
}
