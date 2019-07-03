import { hot } from 'react-hot-loader/root'
import { renderRoutes } from 'react-router-config'
import { routes } from 'routes'

export const ClientAppRoot = hot(() => renderRoutes(routes))
