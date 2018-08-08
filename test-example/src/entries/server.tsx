import * as React from 'react'
import { Router, RequestHandler } from 'express'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import { App } from 'components/App'
import { Html } from 'components/Html'
import unwrapStats from '@gnarlycode/react-app-tools/helpers/unwrap-stats'

// Server Middleware
export default (allstats: any): RequestHandler => {
  const router = Router()

  router.use('/lol', (req, res) => {
    res.json({
      lol: 'kek',
    })
  })

  router.use((req, res, next) => {
    const { scripts } = unwrapStats(allstats)
    const sheet = new ServerStyleSheet()
    const markup = renderToString(sheet.collectStyles(<App />))

    // Render Html Block
    const html = renderToStaticMarkup(
      <Html
        markup={markup}
        scripts={scripts}
        styleEl={sheet.getStyleElement()}
      />,
    )

    // Send Markup
    res.send(`<!doctype html>${html}`)
  })

  return router
}
