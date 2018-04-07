const chalk = require('chalk')
const ROOT_PATH = process.cwd()
require('./load-env')(ROOT_PATH)
const config = require('./get-config')()
const app = require('./get-express-server')({ ROOT_PATH })

app.listen(config.port, config.host, err => {
  if (err) {
    console.error(chalk.bgRed(err))
  } else {
    console.info(
      chalk.cyan(`\n\n💂  Listening at http://${config.host}:${config.port}\n`),
    )
  }
})
