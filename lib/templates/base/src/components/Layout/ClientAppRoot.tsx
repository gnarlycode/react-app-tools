import { hot } from 'react-hot-loader'
import { renderRoutes } from 'react-router-config'
import { routes } from 'routes'

export const ClientAppRoot = hot(module)(() => renderRoutes(routes))
