import { applyMiddleware, compose, createStore, Middleware } from 'redux'
import { reducer } from 'data/reducer'
import * as config from 'config'
import isBrowser from 'is-in-browser'

interface ConfigureStoreArgs<S extends object> {
  init?: S
}

export const makeStore = <S extends object>(args: ConfigureStoreArgs<S>) => {
  const { init = {} } = args

  // Middlewares
  const middlewares: Middleware[] = []

  // Dev Middlewares
  if (config.isDev && isBrowser) {
    const { createLogger } = require('redux-logger')
    const logger = createLogger()
    middlewares.push(logger)
  }

  // Redux Dev Tools
  const composeEnhancers =
    (config.isDev &&
      typeof window === 'object' &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose

  // Create and return Store
  return createStore(
    reducer,
    init,
    composeEnhancers(applyMiddleware(...middlewares)),
  )
}
