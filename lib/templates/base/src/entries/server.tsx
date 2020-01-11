import { RequestHandler } from 'express'
import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter, StaticRouterContext } from 'react-router'
import { renderRoutes } from 'react-router-config'
import unwrapStats from '@gnarlycode/react-app-tools/helpers/unwrap-stats'
import { Html } from 'components/Layout/Html'
import { routes } from 'routes'
import * as config from 'config'

// Server Middleware
export default (allstats: any): RequestHandler => async (req, res) => {
  const { scripts, styles } = unwrapStats(allstats)
  const routerContext: StaticRouterContext = {}
  const helmetContext: any = {}

  try {
    const markup = await renderToString(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={req.url} context={routerContext}>
          {renderRoutes(routes)}
        </StaticRouter>
      </HelmetProvider>,
    )

    const html = renderToStaticMarkup(
      <Html
        helmet={helmetContext.helmet}
        markup={markup}
        scripts={scripts}
        styles={styles}
      />,
    )

    if (routerContext.url) {
      res.writeHead(302, { Location: routerContext.url })
      res.end()
    } else {
      res.send(`<!doctype html>${html}`)
    }
  } catch (error) {
    if (config.isDev) {
      console.error(error)
      res.status(500).send('Internal server <br/>' + error)
    } else {
      res.status(500).send('Internal server')
    }
  }
}
