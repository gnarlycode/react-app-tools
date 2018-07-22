#!/usr/bin/env node

process.env.NODE_ENV = 'production'
const ROOT_PATH = process.cwd()
require('../lib/load-env')(ROOT_PATH)

const {
  BUILD_PATH,
  PUBLIC_PATH,
  SERVER_RENDERER_PATH,
  STATIC_PATH,
  STATS_PATH,
} = require('../lib/get-paths')({ ROOT_PATH })

const fs = require('fs')
const path = require('path')
const { ncp } = require('ncp')

ncp(STATIC_PATH, PUBLIC_PATH, () => console.log('Static files copied!'))

const MockExpressRequest = require('mock-express-request')
const MockExpressResponse = require('mock-express-response')

const stats = require(STATS_PATH)
const server = require(SERVER_RENDERER_PATH).default(stats)

const ensureDirectoryExistence = filePath => {
  const dirname = path.dirname(filePath)
  try {
    fs.statSync(dirname)
  } catch (err) {
    ensureDirectoryExistence(dirname)
    fs.mkdirSync(dirname)
  }
}

const processRequest = url => {
  if (url.indexOf(':') !== -1) return
  if (process.env.BASE_URL) url = url.replace(process.env.BASE_URL, '')

  const req = new MockExpressRequest({ url })
  const res = new MockExpressResponse()
  const next = () => {}

  Promise.resolve(server(req, res, next)).then(function() {
    const fileName =
      url !== '*'
        ? `${url}${url.slice(-1) === '/' ? 'index' : ''}.html`
        : '404.html'
    const fullName = PUBLIC_PATH + fileName
    ensureDirectoryExistence(fullName)
    fs.writeFileSync(fullName, res._getString())
    console.log(`Static created: ${fileName}`)
  })
}

if (process.env.ROUTER_CONFIG) {
  const { routes } = require(path.resolve(BUILD_PATH, 'routes.js'))

  const processRoutes = routes => {
    routes.forEach(route => {
      if (route.path) processRequest(route.path)
      if (route.routes) processRoutes(route.routes)
    })
  }

  processRoutes(routes)
} else {
  processRequest('/')
}
