import { hot } from 'react-hot-loader'
import { renderRoutes } from 'react-router-config'
import { routes, FetchContext } from 'routes'
import { withRouteFetch } from '@gnarlycode/react-route-fetch'

export const ClientAppRoot = hot(module)(
  withRouteFetch<FetchContext>(routes)(() => renderRoutes(routes)),
)
