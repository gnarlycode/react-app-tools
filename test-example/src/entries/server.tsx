import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import { App } from 'components/App'
import { Html } from 'components/Html'

const toArr = (x: string | string[]): string[] => (Array.isArray(x) ? x : [x])

// Server Middleware
// tslint:disable-next-line:no-default-export
export default function(allstats: any) {
  const stats = allstats.clientStats ? allstats.clientStats : allstats

  return async (req: any, res: any, next: any) => {
    // Prepare Assets
    let assets = [
      ...toArr(stats.assetsByChunkName.vendor as string),
      ...toArr(stats.assetsByChunkName.main as string),
    ]
    assets = assets.map(asset => `/${asset}`)
    const scripts = assets.filter(asset => /\.js$/.test(asset))

    // Load Data
    try {
      const sheet = new ServerStyleSheet()
      const markup = renderToString(sheet.collectStyles(<App />))

      // Render Html Block
      const html = renderToString(
        <Html
          markup={markup}
          scripts={scripts}
          styleEl={sheet.getStyleElement()}
        />,
      )

      // Return Markup
      res.write(`<!doctype html>${html}`)

      res.end()
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err)

      if (process.env.NODE_ENV === 'development') {
        next(err)
      } else {
        res.status(500).send(`Internal Server Error`)
      }

      res.end()
    }
  }
}
