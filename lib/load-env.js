const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
const chalk = require('chalk')

module.exports = ROOT_PATH => {
  const DOT_ENV_PATH = path.join(ROOT_PATH, '.env')
  const UNDER_ENV_PATH = path.join(ROOT_PATH, '_env')

  try {
    fs.statSync(DOT_ENV_PATH)
  } catch (e) {
    throw new Error(
      chalk.bgRed(
        `${DOT_ENV_PATH} does not exist. \n Try renaming the 'env' file.`,
      ),
    )
  }

  const env = dotenv.config({ path: DOT_ENV_PATH })
  dotenvExpand(env.parsed)

  // `./env` is considered a definitive list of required environment variables
  const missingVars = Object.keys(
    dotenv.parse(fs.readFileSync(UNDER_ENV_PATH)),
  ).filter(key => !process.env[key])

  if (missingVars.length) {
    throw new Error(
      chalk.bgRed(
        `Missing required environment variable(s): ${missingVars.join(', ')}`,
      ),
    )
  }
}
