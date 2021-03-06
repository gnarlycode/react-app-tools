import React from 'react'

// Types
type HtmlProps = {
  helmet: any
  markup: string
  scripts?: string[]
  styles?: string[]
}

// Component
export const Html = ({
  helmet,
  markup,
  scripts = [],
  styles = [],
}: HtmlProps) => {
  // prettier-ignore
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="og:type" content="website" />
        {helmet.base.toComponent()}
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {helmet.script.toComponent()}
        {styles.map((src, i) => (
          <link rel="stylesheet" href={src} key={i} />
        ))}
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: markup }} />
        {scripts.map((src, i) => <script key={i} src={src} />)}
      </body>
    </html>
  )
}
