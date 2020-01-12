// https://github.com/JetBrains/svg-sprite-loader/blob/master/examples/custom-runtime-generator-extract-mode/extracting-runtime-generator.js
const { generateSpritePlaceholder } = require('svg-sprite-loader/lib/utils')

module.exports = function runtimeGenerator({ symbol, loaderContext }) {
  const publicPath = loaderContext._compiler.options.output.publicPath || '/'
  const spritePlaceholder = generateSpritePlaceholder(symbol.request.file)
  const url = publicPath + spritePlaceholder
  // const viewBox = symbol.viewBox
  // const viewBoxParts = viewBox.split(' ')
  // const width = parseInt(viewBoxParts[2], 10)
  // const height = parseInt(viewBoxParts[3], 10)

  return `
import React from 'react';
export default (p) => React.createElement('svg', p, React.createElement('use', { xlinkHref: '${url}' }))
`
}
