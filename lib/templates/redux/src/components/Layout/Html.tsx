import * as React from 'react'

// Typings
interface HtmlProps {
  helmet: any
  initialState?: any
  markup: string
  scripts?: string[]
  styleEl?: JSX.Element | JSX.Element[]
}

// Component
export function Html({
  helmet,
  initialState,
  markup,
  scripts = [],
  styleEl,
}: HtmlProps) {
  // prettier-ignore
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="og:type" content="website" />
        {helmet.base.toComponent()}
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {helmet.script.toComponent()}
        {styleEl}
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600&subset=cyrillic-ext" rel="stylesheet" />
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: markup }} />
        <script charSet="UTF-8" dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${JSON.stringify(initialState)};` }} />
        {scripts.map((src: string, i: number) => <script key={i} src={src} />)}
      </body>
    </html>
  )
}
