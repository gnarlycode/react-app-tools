const fs = require('fs-extra')
const path = require('path')

const ensureDirectoryExistence = filePath => {
  const dirname = path.dirname(filePath)
  try {
    fs.statSync(dirname)
  } catch (err) {
    ensureDirectoryExistence(dirname)
    fs.mkdirSync(dirname)
  }
}

module.exports = ensureDirectoryExistence
