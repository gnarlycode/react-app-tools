import React from 'react'
import { Router, RequestHandler } from 'express'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
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

  router.use((req, res) => {
    const { scripts, styles } = unwrapStats(allstats)
    const markup = renderToString(<App />)

    // Render Html Block
    const html = renderToStaticMarkup(
      <Html markup={markup} scripts={scripts} styles={styles} />,
    )

    // Send Markup
    res.send(`<!doctype html>${html}`)
  })

  return router
}
