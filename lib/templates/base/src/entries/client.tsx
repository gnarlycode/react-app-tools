import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ClientAppRoot } from 'components/Layout/ClientAppRoot'

hydrate(
  <HelmetProvider>
    <BrowserRouter>
      <ClientAppRoot />
    </BrowserRouter>
  </HelmetProvider>,
  document.getElementById('root'),
)
