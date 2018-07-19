const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
const StatsPlugin = require('stats-webpack-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader')
const getPaths = require('./get-paths')
const getConfig = require('./get-config')
const modulesPath = require('node-modules-path')

module.exports = ({ ROOT_PATH }) => {
  const config = getConfig()
  const { SRC_PATH, PUBLIC_PATH } = getPaths({ ROOT_PATH })

  const CONTEXT_N_MODULES = path.resolve(ROOT_PATH, 'node_modules')
  const CURRENT_N_MODULES = modulesPath(__dirname)
  const MODULES_PATHS =
    CONTEXT_N_MODULES === CURRENT_N_MODULES
      ? [CONTEXT_N_MODULES]
      : [CONTEXT_N_MODULES, CURRENT_N_MODULES]

  // Resolve
  const RESOLVE_MODULES = {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.svg'],
    modules: [SRC_PATH, ...MODULES_PATHS],
  }

  const RESOLVE_LOADERS = {
    modules: MODULES_PATHS,
  }

  // Node Modules
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

  // Add Hot Module To Entry
  const wrapClientEntry = entry => {
    return [
      ...(process.env.POLYFILL === 'true' ? ['babel-polyfill'] : []),
      ...(config.isDev ? ['webpack-hot-middleware/client'] : []),
      ...(Array.isArray(entry) ? entry : [entry]),
    ]
  }

  const moduleHere = name => path.resolve(CURRENT_N_MODULES, name)

  // Babel Options
  const babelOptions = isClient => ({
    presets: [
      [
        moduleHere('babel-preset-env'),
        {
          targets: isClient
            ? {
                browsers: [
                  'last 2 versions',
                  '>= 1%',
                  'safari >= 5',
                  'IE >= 10',
                  'ios >= 6',
                  'android >= 4',
                ],
              }
            : { node: 'current' },
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
    resolve: RESOLVE_MODULES,
    resolveLoader: RESOLVE_LOADERS,
  }

  return [
    // Client
    {
      ...configBase,
      name: 'client',
      target: 'web',
      devtool: config.isDev ? 'inline-source-map' : false,

      entry: wrapClientEntry('./src/entries/client'),

      output: {
        filename: 'js/[name].[hash].js',
        path: PUBLIC_PATH,
        pathinfo: config.isDev,
        publicPath: '/',
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
        new Dotenv({ path: path.resolve(ROOT_PATH, '.env') }),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          },
        }),
        new CheckerPlugin(),
        ...(config.isDev
          ? [
              new webpack.LoaderOptionsPlugin({ debug: true }),
              new webpack.HotModuleReplacementPlugin(),
            ]
          : [new StatsPlugin('../stats.json')]),
        new webpack.NamedModulesPlugin(),
      ],

      module: {
        rules: [tsRule(true), jsRule(true), svgRule()],
      },
    },

    // Server
    {
      ...configBase,
      name: 'server',
      target: 'node',
      externals: NODE_MODULES,
      devtool: config.isDev ? 'inline-source-map' : false,

      entry: config.isDev
        ? './src/entries/server'
        : {
            server: './src/entries/server',
            ...(process.env.ROUTER_CONFIG
              ? {
                  routes: process.env.ROUTER_CONFIG,
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

      plugins: [new CheckerPlugin()],

      node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
      },
    },
  ]
}
