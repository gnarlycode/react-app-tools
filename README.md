<p align="center"><img src="https://github.com/gnarlycode/gnarly-assets/blob/master/gnarly-logo-600.png?raw=true" /></p>

###### _GNARLY CODE_ Presents

# REACT APP TOOLS

Helps to build and start `universal` react apps with `ssr` faster.

Designed for **[CREATE GNARLY APP](https://github.com/gnarlycode/create-gnarly-app)**!

## TARGET STACK

- [TypeScript](https://www.typescriptlang.org)
- [React](https://reactjs.org/)
- [Styled Components](https://www.styled-components.com/)

## INSTALL

- `npm i --save @gnarlycode/react-app-tools`

## COMMANDS

- `gnarly-app-build` — compile app
- `gnarly-app-build-static` — compile static .html files (use regular build first)
- `gnarly-app-dev` — dev serve
- `gnarly-app-serve` — serve

## HELPERS

#### createServerEntry

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

## CONFIG

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

  // Add babel transform runtime
  babelRuntime: true,

  // Browsers list
  browsers: ['last 2 versions', '>= 1%'],
}
```

Also you can create `_env` and `.env` for extra configurations

## CREDITS

[`tslint`](https://palantir.github.io/tslint/)
[`react-helmet`](https://github.com/nfl/react-helmet)
[`react-hot-loader`](https://github.com/gaearon/react-hot-loader)
[`express`](https://expressjs.com/)
[`dotenv`](https://github.com/motdotla/dotenv)
[`dotenv-webpack`](https://github.com/mrsteele/dotenv-webpack)
[`webpack`](https://webpack.js.org/)
[`babel`](https://babeljs.io/)
[`svg-react-loader`](https://github.com/jhamlet/svg-react-loader)
[`awesome-typescript-loader`](https://github.com/s-panferov/awesome-typescript-loader)
[`webpack-hot-server-middleware`](https://www.npmjs.com/package/webpack-hot-server-middleware)
[`@gnarlycode/react-route-fetch`](https://github.com/gnarlycode/react-components/tree/master/packages/react-route-fetch)
[`@gnarlycode/react-scroll-state`](https://github.com/gnarlycode/react-components/tree/master/packages/react-scroll-state)
[`inquirer`](https://github.com/SBoudrias/Inquirer.js/)
[`commander`](https://github.com/tj/commander.js)

###### Author: Dmitry Podlesny
