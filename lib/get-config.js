module.exports = () => ({
  env: process.env.NODE_ENV || 'production',
  host: process.env.HOST || 'localhost',
  isDev: process.env.NODE_ENV === 'development',
  port: process.env.PORT || 3000,
})
