#!/usr/bin/env node
const ROOT_PATH = process.cwd()
process.env.NODE_ENV = 'production'
require('../lib/load-env')(ROOT_PATH)
require('../lib/get-webpack-builder')({ ROOT_PATH })()
