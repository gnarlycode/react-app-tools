const path = require('path')

module.exports = {
  requireOrError: (file, error) => {
    let res
    try {
      res = require(file)
    } catch (ex) {
      console.error(ex)
      throw new Error('\n' + error)
    }
    return res
  },
  requireOrNothing: file => {
    let res = {}
    try {
      res = require(path.resolve(process.cwd(), file))
    } catch (e) {}
    return res
  },
}
