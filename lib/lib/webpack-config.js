const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
const modulesPath = require('node-modules-path')
const { StatsWriterPlugin } = require('webpack-stats-plugin')
const { ROOT_PATH, SRC_PATH, PUBLIC_PATH } = require('./paths')
const config = require('./config')

// Node Modules
const CONTEXT_N_MODULES = path.resolve(ROOT_PATH, 'node_modules')
const CURRENT_N_MODULES = modulesPath(__dirname)
const MODULES_PATHS =
  CONTEXT_N_MODULES === CURRENT_N_MODULES
    ? [CONTEXT_N_MODULES]
    : [CONTEXT_N_MODULES, CURRENT_N_MODULES]

const NODE_MODULES = MODULES_PATHS.reduce(
  (x, p) => [...x, ...fs.readdirSync(p)],
  [],
)
  .filter(x => ['.bin'].indexOf(x) === -1)
  .reduce(
    (modules, mod) => ({
      ...modules,
      [mod]: 'commonjs ' + mod,
    }),
    {},
  )

const moduleHere = name => path.resolve(CURRENT_N_MODULES, name)

// Babel Options
const babelOptions = isClient => ({
  presets: [
    [
      moduleHere('babel-preset-env'),
      {
        targets: isClient ? { browsers: config.browsers } : { node: 'current' },
        modules: isClient ? 'commonjs' : false,
      },
    ],
  ],
  plugins: [
    [
      moduleHere('babel-plugin-styled-components'),
      { ssr: true, displayName: config.isDev },
    ],
    moduleHere('babel-plugin-transform-react-jsx'),
    ...(config.babelRuntime
      ? [
          [
            moduleHere('babel-plugin-transform-runtime'),
            { polyfill: false, regenerator: true },
          ],
        ]
      : []),
    moduleHere('react-hot-loader/babel'),
  ],
})

//
// Rules
//

// TypeScript
const tsRule = isClient => ({
  test: /\.tsx?$/,
  loader: 'awesome-typescript-loader',
  exclude: /node_modules/,
  query: {
    babelCore: 'babel-core',
    babelOptions: babelOptions(isClient),
    configFileName: path.resolve(ROOT_PATH, 'tsconfig.json'),
    errorsAsWarnings: config.isDev,
    silent: true,
    useBabel: true,
    useCache: true,
  },
})

// JavaScript
const jsRule = isClient => ({
  test: /\.jsx?$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
  options: babelOptions(isClient),
})

// SVG
const svgRule = () => ({
  test: /\.svg(\?.*)?$/,
  use: {
    loader: 'svg-react-loader',
    query: {
      classIdPrefix: '[hash:8]__',
    },
  },
})

// The base of config
const configBase = {
  mode: config.env,
  context: ROOT_PATH,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.svg'],
    modules: [SRC_PATH, ...MODULES_PATHS],
  },
  resolveLoader: { modules: MODULES_PATHS },
}

// Client
const clientConfig = {
  ...configBase,
  name: 'client',
  target: 'web',
  devtool: config.isDev ? 'eval-source-map' : false,

  entry: [
    ...(config.isDev
      ? [`webpack-hot-middleware/client?path=${config.baseUrl}/__webpack_hmr`]
      : []),
    './src/entries/client',
  ],

  output: {
    filename: 'js/[name].[hash].js',
    path: PUBLIC_PATH,
    pathinfo: config.isDev,
    publicPath: config.baseUrl || '/',
  },

  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },

  optimization: {
    minimize: !config.isDev,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true,
        },
      },
    },
  },

  plugins: [
    ...(process.env.USE_DOT_ENV_FILE
      ? [new Dotenv({ path: path.resolve(ROOT_PATH, '.env') })]
      : []),
    new webpack.DefinePlugin({
      'process.env': {
        BASE_URL: JSON.stringify(config.baseUrl),
        HOST: JSON.stringify(config.host),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        PORT: JSON.stringify(config.port),
      },
    }),
    ...(config.isDev
      ? [
          new webpack.LoaderOptionsPlugin({ debug: true }),
          new webpack.HotModuleReplacementPlugin(),
        ]
      : [new StatsWriterPlugin({ filename: '../stats.json' })]),
  ],

  module: {
    rules: [tsRule(true), jsRule(true), svgRule()],
  },
}

// Server
const serverConfig = {
  ...configBase,
  name: 'server',
  target: 'node',
  externals: NODE_MODULES,
  devtool: config.isDev ? 'eval-source-map' : false,

  entry: config.isDev
    ? './src/entries/server'
    : {
        server: './src/entries/server',
        ...(config.routerConfig
          ? {
              routes: config.routerConfig,
            }
          : {}),
      },

  output: {
    path: path.resolve(PUBLIC_PATH, '../'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },

  module: {
    rules: [tsRule(false), jsRule(false), svgRule()],
  },

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
}

module.exports = [clientConfig, serverConfig]
