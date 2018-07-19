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

- `gnarly-react-app-build` — compile app
- `gnarly-react-app-build-static` — compile static .html files (use regular build first)
- `gnarly-react-app-dev` — dev serve
- `gnarly-react-app-serve` — serve

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

## ENV Options

- `EXPRESS_APP` — Add additional express app to server
- `EXPRESS_SERVING_STATIC` — Enables static serving with express
- `ROUTER_CONFIG` — Path to [react-router-config](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config) for static generation
- `BABEL_POLYFILL` — Enables [babel-polyfill](https://babeljs.io/docs/en/babel-polyfill/)
- `BABEL_RUNTIME` — Enables [babel-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime.html)

## Building use:

- [Webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)
- [Awesome Typescript Loader](https://github.com/s-panferov/awesome-typescript-loader)
- [Svg React Loader](https://github.com/jhamlet/svg-react-loader)
- [Dotenv Webpack](https://github.com/mrsteele/dotenv-webpack)

## Serving use:

- [Express](https://expressjs.com/)

###### Author: Dmitry Podlesny
