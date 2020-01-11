// System
const fs = require('fs')
const path = require('path')
const modulesPath = require('node-modules-path')

// Webpack
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
const WebpackBar = require('webpackbar')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const { StatsWriterPlugin } = require('webpack-stats-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

// Utils
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
    (res, module) => ({
      ...res,
      [module]: 'commonjs ' + module,
    }),
    {},
  )

// Module Resolver
const m = name => path.resolve(CURRENT_N_MODULES, name)

//
// Rules
//

const jsRule = isClient => ({
  test: /\.(j|t)sx?$/,
  exclude: config.isDev ? /node_modules/ : undefined,
  use: [
    {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        babelrc: false,
        presets: [
          [
            m('@babel/preset-env'),
            {
              targets: isClient ? {} : { node: 'current' },
              modules: isClient ? 'commonjs' : false,
            },
          ],
          m('@babel/preset-typescript'),
          m('@babel/preset-react'),
        ],
        plugins: [
          m('@babel/plugin-proposal-optional-chaining'),
          m('@babel/plugin-proposal-nullish-coalescing-operator'),
          [m('@babel/plugin-proposal-decorators'), { legacy: true }],
          [m('@babel/plugin-proposal-class-properties'), { loose: true }],
          [
            m('@babel/plugin-transform-runtime'),
            { helpers: false, regenerator: true },
          ],
          m('react-hot-loader/babel'),
        ],
      },
    },
    'astroturf/loader',
  ],
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

// CSS
const cssRule = isClient => ({
  test: /\.css$/,
  exclude: /node_modules/,
  use: isClient
    ? [
        {
          loader: MiniCssExtractPlugin.loader,
          options: { hmr: config.isDev },
        },
        { loader: 'astroturf/css-loader', options: { url: false } },
        {
          loader: 'postcss-loader',
          options: {
            // https://github.com/postcss/postcss-simple-vars/issues/75#issuecomment-444741855
            plugins: loader => {
              const cssVars = require.resolve(
                SRC_PATH + '/styles/styleVars.json',
              )
              loader.addDependency(cssVars)
              delete require.cache[cssVars]
              return [
                require('autoprefixer'),
                require('postcss-simple-vars')({
                  variables: () => require(cssVars),
                }),
              ]
            },
          },
        },
      ]
    : [
        {
          loader: 'astroturf/css-loader',
          options: { onlyLocals: true },
        },
      ],
})

const cssExternalRule = isClient => ({
  test: /\.css$/,
  include: /node_modules/,
  use: isClient
    ? [
        {
          loader: MiniCssExtractPlugin.loader,
          options: { hmr: config.isDev },
        },
        'css-loader',
      ]
    : [
        {
          loader: 'css-loader',
          options: { onlyLocals: true },
        },
      ],
})

// The base of config
const configBase = isClient => ({
  mode: config.env,
  context: ROOT_PATH,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.svg'],
    modules: [SRC_PATH, ...MODULES_PATHS],
    alias: {
      'react-dom': m('@hot-loader/react-dom'),
    },
  },
  resolveLoader: { modules: MODULES_PATHS },
  module: {
    rules: [
      cssRule(isClient),
      cssExternalRule(isClient),
      jsRule(isClient),
      svgRule(isClient),
    ],
  },
})

// Client
const clientConfig = {
  ...configBase(true),
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
    maxEntrypointSize: 1000000,
    maxAssetSize: 1000000,
  },

  optimization: {
    minimize: !config.isDev,
    minimizer: !config.isDev
      ? [new OptimizeCSSAssetsPlugin({}), new TerserPlugin()]
      : undefined,
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
    new FriendlyErrorsWebpackPlugin(),
    new WebpackBar({
      name: 'client',
      color: '#75bb39',
      compiledIn: false,
    }),
    ...(process.env.USE_DOT_ENV_FILE
      ? [new Dotenv({ path: path.resolve(ROOT_PATH, '.env') })]
      : []),
    new ForkTsCheckerWebpackPlugin({
      formatter: 'codeframe',
      useTypescriptIncrementalApi: true,
      tsconfig: path.resolve(ROOT_PATH, 'tsconfig.json'),
      eslint: true,
      async: false,
      silent: false,
    }),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     BASE_URL: JSON.stringify(config.baseUrl),
    //     HOST: JSON.stringify(config.host),
    //     NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    //     PORT: JSON.stringify(config.port),
    //   },
    // }),
    new MiniCssExtractPlugin({
      filename: config.isDev ? 'css/[name].css' : 'css/[name].[hash:8].css',
      chunkFilename: config.isDev ? 'css/[id].css' : 'css/[id].[hash:8].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    ...(config.isDev
      ? [
          new webpack.LoaderOptionsPlugin({ debug: true }),
          new webpack.HotModuleReplacementPlugin(),
        ]
      : [new StatsWriterPlugin({ filename: '../stats.json' })]),
    ...(process.argv.includes('--analyze')
      ? [new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)()]
      : []),
  ],
}

// Server
const serverConfig = {
  ...configBase(false),
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

  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new WebpackBar({
      name: 'server',
      color: '#952e96',
      compiledIn: false,
    }),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     BASE_URL: JSON.stringify(config.baseUrl),
    //     HOST: JSON.stringify(config.host),
    //     PORT: JSON.stringify(config.port),
    //   },
    // }),
  ],

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
