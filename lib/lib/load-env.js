const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')

const ROOT_PATH = process.cwd()
const DOT_ENV_PATH = path.join(ROOT_PATH, '.env')
const UNDER_ENV_PATH = path.join(ROOT_PATH, '_env')

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production'

try {
  fs.statSync(UNDER_ENV_PATH)
  process.env.USE_DOT_ENV_FILE = true
} catch (e) {}

if (process.env.USE_DOT_ENV_FILE) {
  try {
    fs.statSync(DOT_ENV_PATH)
  } catch (e) {
    console.info('.env file was copied from _env')
    fs.copyFileSync(UNDER_ENV_PATH, DOT_ENV_PATH)
  }

  dotenv.config({ path: DOT_ENV_PATH })

  // `./env` is considered a definitive list of required environment variables
  const missingVars = Object.keys(
    dotenv.parse(fs.readFileSync(UNDER_ENV_PATH)),
  ).filter(key => !process.env[key])

  if (missingVars.length) {
    throw new Error(
      `Missing required environment variable(s): ${missingVars.join(', ')}`,
    )
  }
}
