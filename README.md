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

- `gnarly-react-app-build` — compile
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

## Also

You can add additional express app to this starter using `EXPRESS_APP` key in your .env with path value

## Building use:

- [Webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)
- [Awesome Typescript Loader](https://github.com/s-panferov/awesome-typescript-loader)
- [Svg React Loader](https://github.com/jhamlet/svg-react-loader)
- [Dotenv Webpack](https://github.com/mrsteele/dotenv-webpack)

## Serving use:

- [Express](https://expressjs.com/)

###### Author: Dmitry Podlesny
