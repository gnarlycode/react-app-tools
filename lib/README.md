<p align="center"><img src="https://github.com/gnarlycode/gnarly-assets/blob/master/gnarly-logo-600.png?raw=true" /></p>

###### _GNARLY CODE_ Presents

# React App Tools

Helps to build and start universal react apps with ssr faster. Designed for and works best with [the boilerplate](https://github.com/gnarlycode/boiler-react-redux)

## Target stack:

- [TypeScript](https://www.typescriptlang.org)
- [React](https://reactjs.org/)
- [Styled Components](https://www.styled-components.com/)

## Install:

- `npm i --save @gnarlycode/react-app-tools`

## Commands:

- `gnarly-app-build` — compile app
- `gnarly-app-build-static` — compile static .html files (use regular build first)
- `gnarly-app-dev` — dev serve
- `gnarly-app-serve` — serve

## Helpers

### Create Server Entry

Example:

```jsx
// src/entries/server.tsx

import createServerEntry from '@gnarlycode/react-app-tools/helpers/server-entry'

export default createServerEntry(
  ({ assets, next, req, res, scripts, stats }) => {
    // Do your stuff
    req.end()
  },
)
```

Look `test-example/src/entries/server.tsx` in the repo for another example.

## Configure

You can create next files in root of your project to configure builder:

- `gnarly.config.js` — default config
- `gnarly.config.local.js` — local, extends default, do not commit

Available options:

```js
module.exports = {
  // Server listening
  host: '0.0.0.0',
  port: 8080,

  // Url prefix
  baseUrl: '/base-url',

  // For static renderer, used when you run `npm run build-static` or `build-all`
  routerConfig: './src/routes',

  // Serve static with express (do not enable if static served with nginx for example)
  serveStatic: true,

  // Add extra express app
  expressApp: './api/index.js',

  // Add babel transform runtime
  babelRuntime: true,

  // Browsers list
  browsers: ['last 2 versions', '>= 1%'],
}
```

Also you can create `_env` and `.env` for extra configurations

## Building use:

- [Webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)
- [Awesome Typescript Loader](https://github.com/s-panferov/awesome-typescript-loader)
- [Svg React Loader](https://github.com/jhamlet/svg-react-loader)
- [Dotenv Webpack](https://github.com/mrsteele/dotenv-webpack)

## Serving use:

- [Express](https://expressjs.com/)

###### Author: Dmitry Podlesny
