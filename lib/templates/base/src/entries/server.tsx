import * as React from 'react'
import Helmet from 'react-helmet'
import { RequestHandler } from 'express'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter, StaticRouterContext } from 'react-router'
import { renderRoutes } from 'react-router-config'
import { ServerStyleSheet } from 'styled-components'
import { routes } from 'routes'
import { Html } from 'components/Layout/Html'
import unwrapStats from '@gnarlycode/react-app-tools/helpers/unwrap-stats'

// Server Middleware
export default (allstats: any): RequestHandler => (req, res) => {
  const { scripts } = unwrapStats(allstats)
  const routerContext: StaticRouterContext = {}
  const sheet = new ServerStyleSheet()

  // Render App
  const markup = renderToString(
    sheet.collectStyles(
      <StaticRouter location={req.url} context={routerContext}>
        {renderRoutes(routes)}
      </StaticRouter>,
    ),
  )

  // Render Html
  const html = renderToStaticMarkup(
    <Html
      helmet={Helmet.renderStatic()}
      markup={markup}
      scripts={scripts}
      styleEl={sheet.getStyleElement()}
    />,
  )

  // Response
  if (routerContext.url) {
    res.writeHead(302, { Location: routerContext.url })
    res.end()
  } else {
    res.send(`<!doctype html>${html}`)
  }
}
