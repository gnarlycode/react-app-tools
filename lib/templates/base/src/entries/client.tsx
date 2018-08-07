import * as React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ClientAppRoot } from 'components/Layout/ClientAppRoot'

hydrate(
  <BrowserRouter>
    <ClientAppRoot />
  </BrowserRouter>,
  document.getElementById('root'),
)
